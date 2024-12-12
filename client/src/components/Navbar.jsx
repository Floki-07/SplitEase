import axios from "axios";
import { X, CircleUser, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NavBar({ isLanding, avatarUrl, setAvatarUrl, user }) {
  const navigate = useNavigate();

  // Update AvatarUrl from localStorage if it changes
  // useEffect(() => {
  //   const url = localStorage.getItem("AvatarUrl");
  //   setAvatarUrl(url || null);
  // }, []);
  const [modalopen, setModalopen] = useState(false)
  const handleModalOpen = () => {
    setModalopen(true)
  }
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/logout", {}, { withCredentials: true });
      // Clear local storage and navigate to login
      localStorage.removeItem("AvatarUrl");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div
      className={`flex justify-between ${isLanding ? "absolute z-10" : "border-b"
        } border-[--border-line] items-center h-[60px] pr-5 w-full`}
    >
      <div
        className={`text-[20px] w-[60px] ${isLanding ? "" : "border-r"
          } border-[--border-line] h-full flex justify-center items-center`}
      >
        {/* Placeholder for logo */}
      </div>

      <div className="flex gap-10 items-center relative">
        {/* Display Avatar if not Landing */}
        {!isLanding &&
          (<>
            <div className="w-[50px] h-[50px] relative" onClick={handleModalOpen}>
              <img
                src={avatarUrl}
                alt="Avatar"
                className="h-[50px] w-[50px] rounded-full"
              // onError={(e) => {
              //   e.target.src = "/images/Sample.png";
              // }}
              />

            </div>
            {modalopen &&
              <div className="absolute top-[65px] flex flex-col  right-[5px]  bg-[--background3] w-[230px] h-[270px] rounded-sm">
                <div className="w-full flex items-end justify-end px-2 py-2 text-[--ternary]">
                  <div><X size={19}  className="hover:scale-[110%]" onClick={() => setModalopen(false)} /></div>
                </div>
                <div className="w-[90%] mx-auto  h-[120px] mt-[5px] ">

                  <div className="w-full flex flex-col gap-3  text-[--ternary] font-semibold justify-center items-center">
                    <div className="w-[70px] h-[70px] relative mx-auto" onClick={handleModalOpen}>
                      <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="h-[70px] w-[70px] rounded-full"
                      // onError={(e) => {
                      //   e.target.src = "/images/Sample.png";
                      // }}
                      />

                    </div>
                    <h1 className="text-[20px] font-normal">Hi , <span className="font-semibold text-[--heading]">{user?.username || 'User'}</span></h1>
                  </div>

                  <div className="text-[--ternary] w-[100%] flex justify-between rounded-md  items-center h-[45px] mt-1 hover:bg-[--background2] transition-all hover:cursor-pointer ">
                    <div className="flex justify-start gap-2 items-center pl-1">
                      <CircleUser size={25} className="" />
                      <div><span className="text-sm">Profile</span></div>
                    </div>
                  </div>
                  <div className="text-[--ternary] w-[100%] flex justify-between rounded-md  items-center h-[45px] mt-1 hover:bg-[--background2] hover:cursor-pointer "
                    onClick={handleLogout}
                  >
                    <div className="flex justify-start gap-2 items-center pl-1">
                      <LogOut size={25} className="" />
                      <div><span className="text-sm">Sign Out</span></div>
                    </div>
                  </div>



                </div>
              </div>

            }

          </>
          )}
      </div>
    </div>
  );
}

export default NavBar;
