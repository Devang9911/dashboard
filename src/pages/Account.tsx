import UpdatePass from "../features/account/UpdatePass";
import UpdateUserData from "../features/account/UpdateUserData";

function Account() {
  return (
    <div className="flex flex-col gap-6 text-gray-800 h-full">
      {/* HEADER */}
      <div className="flex items-center justify-between w-full">
        <h2 className="text-3xl font-semibold">Update your account</h2>
      </div>
      <div className="flex flex-col gap-3 justify-between w-full">
        <h2 className="text-xl">Update user data</h2>
        <UpdateUserData/>
      </div>
      <div className="flex flex-col gap-3 justify-between w-full">
        <h2 className="text-xl">Update password</h2>
        <UpdatePass/>
      </div>
    </div>
  );
}

export default Account;
