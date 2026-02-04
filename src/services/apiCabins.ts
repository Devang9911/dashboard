import type { Database } from "./database.types";
import { supabase } from "./supabase";

type Cabin = Database["public"]["Tables"]["cabins"]["Row"];
export type NewCabin = Omit<Cabin, "id" | "created_at"> & {
  imageFile?: File;
};

export async function getCabins(): Promise<Cabin[]> {
  const { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error(error.message);
  }

  return cabins ?? [];
}

export async function createCabin(data: NewCabin) {
  let imagePath: string | null = data.image ?? null;

  // Upload ONLY if a new file exists
  if (data.imageFile instanceof File) {
    const fileName = `cabins/${Date.now()}-${data.imageFile.name}`;

    const { error: uploadError } = await supabase.storage
      .from("cabin_images")
      .upload(fileName, data.imageFile);

    if (uploadError) throw new Error("Image upload failed");

    const { data: publicUrlData } = supabase.storage
      .from("cabin_images")
      .getPublicUrl(fileName);

    imagePath = publicUrlData.publicUrl;
  }

  const { data: cabin, error } = await supabase
    .from("cabins")
    .insert({
      name: data.name,
      description: data.description,
      max_capacity: data.max_capacity,
      regular_price: data.regular_price,
      discount: data.discount,
      image: imagePath,
    })
    .select()
    .single();

  if (error) throw new Error("Cabin creation failed");

  return cabin;
}

export async function deleteCabin(id: number): Promise<void> {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateCabin(id: number, data: NewCabin) {
  let imagePath: string | undefined;

  // this only runs when new file uploaded
  if (data.imageFile instanceof File) {
    const fileName = `cabins/${Date.now()}-${data.imageFile.name}`;

    const { error: uploadError } = await supabase.storage
      .from("cabin_images")
      .upload(fileName, data.imageFile);

    if (uploadError) throw new Error("Image upload failed");

    const { data: publicUrlData } = supabase.storage
      .from("cabin_images")
      .getPublicUrl(fileName);

    imagePath = publicUrlData.publicUrl;
  }

  const updatePayload = {
    name: data.name,
    description: data.description,
    max_capacity: data.max_capacity,
    regular_price: data.regular_price,
    discount: data.discount,
    ...(imagePath && { image: imagePath }),
  };

  const { data: updatedCabin, error } = await supabase
    .from("cabins")
    .update(updatePayload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("Cabin update failed");
  }

  return updatedCabin;
}
