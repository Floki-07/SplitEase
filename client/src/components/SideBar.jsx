import {
  ChartSpline,
  HandCoins,
  Home,
  PiggyBank,
  Scale,
  Split,
  UsersRound,
  ChevronRight,
  ChevronLeft,
  User,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const sideBarItems = [
  { name: "Home", icon: <Home />, url: "home" },
  { name: "Transactions", icon: <HandCoins />, url: "/moneyflow" },
  // { name: "Analytics", icon: <ChartSpline />, url: "analytics" },
  { name: "Split", icon: <Split />, url: "/split" },
  { name: "Settle", icon: <Scale />, url: "/settle" },
  { name: "Groups", icon: <UsersRound />, url: "/groups" },
  { name: "Manage Goals", icon: <PiggyBank />, url: "/savings" },
  // { name: "Add Friend", icon: <User />, url: "split/friendsplit" },
];

function SideBar({ isLanding }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {!isLanding && (
        <div
          className={`${
            isOpen ? "w-48" : "w-[60px]"
          } bg[--secondary] transition-all duration-300 ease-in-out border-r border-[--border-line] h-full flex flex-col py-5`}
        >
          {/* Toggle Button */}
          <div className="flex justify-end px-2 mb-6  ">
            <button
              onClick={toggleSidebar}
              className="text-white hover:text-[--secondary] transition-colors bg-[--background3] rounded-full p-2 flex items-center justify-center hover:bg-[--background3]/80"
            >
              {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>

          {/* Sidebar Items */}
          <div className="flex flex-col gap-4 px-2">
            {sideBarItems.map((item, i) => {
              const isActive = location.pathname.includes(item.url);
              return (
                <Link
                  to={item.url}
                  key={i}
                  className={`w-46 flex items-center gap-4 px-3 py-2 rounded-md transition-all ${
                    isActive
                      ? "text-[--secondary] bg-white/10"
                      : "text-white hover:bg-white/5"
                  }`}
                >
                  {item.icon}
                  <span
                    className={`transition-opacity duration-300 ${
                      isOpen ? "opacity-100" : "opacity-0 hidden"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default SideBar;
