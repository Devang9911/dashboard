import { HiOutlineUser } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function AccountButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/account")}
      className="p-1 flex items-center gap-2 cursor-pointer 
                 hover:bg-indigo-200/40 rounded transition"
    >
      <HiOutlineUser className="w-8 h-12 text-indigo-600" />
      <span className="text-sm font-medium text-indigo-700">
        Account
      </span>
    </button>
  );
}

export default AccountButton;
