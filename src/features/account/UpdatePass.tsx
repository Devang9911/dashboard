import { useForm } from "react-hook-form";
import { useUpdatePassword } from "../login/useUpdatePassword";

type FormValues = {
  password: string;
  confirmPassword: string;
};

function UpdatePass() {
  const { mutate: updatePassword, isPending } = useUpdatePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const handleOnSubmit = (data: FormValues) => {
    updatePassword(
      { password: data.password },
      {
        onSuccess: () => reset(),
      }
    );
  };

  return (
    <form
      className="w-full rounded bg-white flex flex-col gap-6 px-6 py-7 shadow"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      {/* Password */}
      <div className="grid grid-cols-[180px_1fr_1fr] gap-6 items-center">
        <label className="text-md font-medium text-gray-700">
          New Password
        </label>

        <input
          type="password"
          placeholder="••••••••"
          className="w-full bg-white p-2 shadow rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />

        <p className="text-sm text-red-500">{errors.password?.message}</p>
      </div>

      {/* Confirm Password */}
      <div className="grid grid-cols-[180px_1fr_1fr] gap-6 items-center">
        <label className="text-md font-medium text-gray-700">
          Confirm Password
        </label>

        <input
          type="password"
          placeholder="••••••••"
          className="w-full bg-white p-2 shadow rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value, formValues) =>
              value === formValues.password || "Passwords do not match",
          })}
        />

        <p className="text-sm text-red-500">
          {errors.confirmPassword?.message}
        </p>
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
            {isPending ? "Updating..." : "Update Password"}
          </button>
        </div>

        <div />
      </div>
    </form>
  );
}

export default UpdatePass;
