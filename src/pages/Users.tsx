import { useForm } from "react-hook-form";
import { useSignup } from "../features/login/useSignup";

type FormValues = {
  fullname: string;
  email: string;
  password: string;
  confirmpassword: string;
};

function Users() {
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>();

  const { mutate: signupUser, isPending } = useSignup();

  const handleOnSubmit = (data: FormValues) => {
    // console.log(data);
    signupUser(
      { email: data.email, password: data.password, fullname: data.fullname },
      {
        onSettled: ()=>{
          reset()
        }
      },
    );
  };

  return (
    <div className="min-h-screen flex flex-col gap-6 text-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <h2 className="text-3xl font-semibold capitalize">Create a New User</h2>
      </div>
      <form
        className="w-full rounded bg-white flex flex-col gap-6 px-6 py-7 shadow"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        {/* Full Name */}
        <div className="grid grid-cols-[180px_1fr_1fr] gap-6 items-center">
          <label className="text-md font-medium text-gray-700">Full Name</label>

          <input
            type="text"
            placeholder="Devang Randeria"
            className="w-full bg-white p-2 shadow rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("fullname", { required: "This field is required" })}
          />

          <p className="text-sm text-red-500">{errors.fullname?.message}</p>
        </div>

        {/* Email */}
        <div className="grid grid-cols-[180px_1fr_1fr] gap-6 items-center">
          <label className="text-md font-medium text-gray-700">Email</label>

          <input
            type="email"
            placeholder="devang@gmail.com"
            className="w-full bg-white p-2 shadow rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("email", { required: "This field is required" })}
          />

          <p className="text-sm text-red-500">{errors.email?.message}</p>
        </div>

        {/* Password */}
        <div className="grid grid-cols-[180px_1fr_1fr] gap-6 items-center">
          <label className="text-md font-medium text-gray-700">Password</label>

          <input
            type="password"
            placeholder="••••••••"
            className="w-full bg-white p-2 shadow rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
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
            {...register("confirmpassword", {
              required: "This field is required",
              validate: (value) =>
                value === getValues().password || "Passwords do not match",
            })}
          />

          <p className="text-sm text-red-500">
            {errors.confirmpassword?.message}
          </p>
        </div>

        {/* Button */}
        <div className="grid grid-cols-[180px_1fr_1fr] gap-6">
          <div />
          <button
            type="submit"
            disabled={isPending}
            className="w-fit px-6 py-2 rounded-lg bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-800 transition"
          >
            {isPending ? "Creating" : "Create new user"}
          </button>
          <div />
        </div>
      </form>
    </div>
  );
}

export default Users;
