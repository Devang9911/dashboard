import Logout from "../components/ui/Logout";
import AccountButton from "../components/ui/AccountButton";
import { useCurrentUser } from "../features/login/useCurrentUser";
import Avatar from "../components/ui/Avatar";

function Header() {
  const { user } = useCurrentUser();
  return (
    <header className="p-5 border-b-2 bg-gray-200">
      <div className="flex items-center justify-end gap-5">
        <Avatar fullName={user?.user_metadata.fullname} imageUrl={user?.user_metadata.avatar_url} />
        <AccountButton />
        <Logout />
      </div>
    </header>
  );
}

export default Header;
