import {
    ChartSpline,
    HandCoins,
    Home,
    PiggyBank,
    Settings,
    Split,
    UsersRound,
  } from "lucide-react";
  import { Link, useLocation } from "react-router-dom";
  
  const sideBarItems = [
    { name: "home", icon: <Home />, url: "home" },
    { name: "analytics", icon: <ChartSpline />, url: "analytics" },
    { name: "split", icon: <Split />, url: "/split" }, 
    { name: "groups", icon: <UsersRound />, url: "/groups" },
    { name: "moneyflow", icon: <HandCoins />, url: "/moneyflow" },
    { name: "savings", icon: <PiggyBank />, url: "/savings" },
    // { name: "settings", icon: <Settings />, url: "/settings" },
  ];
  
  function SideBar({ isLanding }) {
    const location = useLocation();
  
    return (
      <>
        {!isLanding && (
          <div className="w-[60px] border-r border-[--border-line] h-full flex flex-col items-center py-10 justify-between">
            <div className="flex flex-col gap-10 justify-center items-center my-auto">
              {sideBarItems.map((item, i) => (
                <Link
                  to={item.url}
                  key={i}
                  className={`${
                    location.pathname.includes(item.url)
                      ? "text-[--secondary] text-xl"
                      : "text-white"
                  }`}
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
        )}
      </>
    );
  }
  
  export default SideBar;
  