import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "../../features/login/useLogout";

function Logout() {
  const { mutate: logoutUser, isPending } = useLogout();

  return (
    <button
      className="p-1 flex items-center gap-2 cursor-pointer 
                 hover:bg-indigo-200/40 rounded transition"
      disabled={isPending}
      onClick={() => logoutUser()}
    >
      <HiArrowRightOnRectangle className="w-8 h-12 text-indigo-600" />
      <span className="text-sm font-medium text-indigo-700">
        Logout
      </span>
    </button>
  );
}

export default Logout;
