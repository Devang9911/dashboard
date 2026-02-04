import { supabase } from "./supabase";

type LoginCredentials = {
  email: string;
  password: string;
};

export async function login({ email, password }: LoginCredentials) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

type SignupCredentials = {
  email: string;
  password: string;
  fullname: string;
};

export async function signup({ email, password, fullname }: SignupCredentials) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullname,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (data.user && data.user.identities?.length === 0) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  return data;
}

type UpdateUserData = {
  fullname?: string;
  avatar?: File;
};


export async function updateUserData({ fullname, avatar }: UpdateUserData) {
  const { data: currentUser } = await supabase.auth.getUser();

  if (!currentUser.user) throw new Error("User not logged in");

  let avatarUrl = currentUser.user.user_metadata.avatar_url;

  if (avatar) {
    const fileExt = avatar.name.split(".").pop();
    const fileName = `${currentUser.user.id}-${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, avatar, { upsert: true });

    if (uploadError) throw new Error(uploadError.message);

    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    avatarUrl = urlData.publicUrl;
  }

  const { error } = await supabase.auth.updateUser({
    data: {
      fullname,
      avatar_url: avatarUrl,
    },
  });

  if (error) throw new Error(error.message);

  return { fullname, avatar_url: avatarUrl };
}


export async function updatePassword(password: string) {
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw new Error(error.message);
}
