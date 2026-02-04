import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="flex h-screen">
      
      <Sidebar />
      <section className="flex flex-col flex-1">
        <Header />
        <main className="h-full overflow-y-auto bg-gray-300 md:p-10 p-2">
          <Outlet />
        </main>
      </section>
    </div>
  );
}

export default AppLayout;
