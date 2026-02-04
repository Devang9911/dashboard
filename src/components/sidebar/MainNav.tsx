import { NavLink } from "react-router-dom";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import type { IconType } from "react-icons"; 

type NavItem = { 
  to: string;
  label: string;
  icon: IconType;
};

const navItems: NavItem[] = [ 
  {
    to: "dashboard",
    label: "Home",
    icon: HiOutlineHome,
  },
  {
    to: "bookings",
    label: "Bookings",
    icon: HiOutlineCalendarDays,
  },
  {
    to: "cabins",
    label: "Cabins",
    icon: HiOutlineHomeModern,
  },
  {
    to: "users",
    label: "Users",
    icon: HiOutlineUsers,
  },
  {
    to: "settings",
    label: "Settings",
    icon: HiOutlineCog6Tooth,
  },
];

function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-3">
        {navItems.map((item) => (
          <li key={item.label}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md font-medium transition
                ${
                  isActive
                    ? "bg-black/10 text-black border-l-4 border-black/60"
                    : "text-gray-700 hover:bg-black/10"
                }`
              }
            >
              <item.icon className="text-lg" />
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MainNav;
