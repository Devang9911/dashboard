import Logo from "../components/sidebar/Logo"
import MainNav from "../components/sidebar/MainNav";


function Sidebar() {
  return <aside className="hidden h-full w-70 border-r-2 p-7 lg:flex flex-col gap-10 bg-gray-200 z-10">
    <Logo/>
    <MainNav/>
  </aside>;
}

export default Sidebar;
