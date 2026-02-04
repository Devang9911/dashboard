import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCurrentUser } from "../login/useCurrentUser";
import { useUpdateUser } from "../login/useUpdateUser";

type FormValues = {
  fullname: string;
  avatar?: FileList;
};

function UpdateUserData() {
  const { user } = useCurrentUser();
  const { mutate: updateUser, isPending } = useUpdateUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  // ✅ Set default values when user loads
  useEffect(() => {
    if (user) {
      reset({
        fullname: user.user_metadata.fullname || "",
      });
    }
  }, [user, reset]);

  const handleOnSubmit = (data: FormValues) => {
    const avatarFile = data.avatar?.[0]; // ✅ correct

    updateUser(
      {
        fullname: data.fullname,
        avatar: avatarFile, // File | undefined
      },
      {
        onSuccess: () => reset(),
      },
    );
  };

  return (
    <form
      className="w-full rounded bg-white flex flex-col gap-6 px-6 py-7 shadow"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      {/* Email */}
      <div className="grid grid-cols-[180px_1fr_1fr] gap-6 items-center">
        <label className="text-md font-medium text-gray-700">Email</label>

        <input
          type="email"
          value={user?.email}
          disabled
          className="w-full bg-gray-100 p-2 shadow rounded border border-gray-300"
        />
      </div>

      {/* Full Name */}
      <div className="grid grid-cols-[180px_1fr_1fr] gap-6 items-center">
        <label className="text-md font-medium text-gray-700">Full Name</label>

        <input
          type="text"
          className="w-full bg-white p-2 shadow rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          {...register("fullname", {
            required: "Full name is required",
          })}
        />

        <p className="text-sm text-red-500">{errors.fullname?.message}</p>
      </div>

      {/* Avatar */}
      <div className="grid grid-cols-[180px_1fr_1fr] gap-6 items-center">
        <label className="text-md font-medium text-gray-700">Avatar</label>

        <input
          type="file"
          accept="image/*"
          {...register("avatar")}
        />
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-[180px_1fr_1fr] gap-6 mt-4">
        <div />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-800 disabled:opacity-60"
          >
            {isPending ? "Updating..." : "Update Account"}
          </button>
        </div>

        <div />
      </div>
    </form>
  );
}

export default UpdateUserData;
