import axios from "axios";
import { X, CircleUser, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// import NavbarImage from "./NavbarImage";
import React, { Suspense, lazy } from 'react';

const NavbarImage = lazy(() => import('./NavbarImage'));

function NavBar({ isLanding }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null)
  const [modalopen, setModalopen] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState('')
  const [loading, setLoading] = useState(false)
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

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem("token");

        let response;
        if (token) {
          try {
            response = await axios.get(`http://localhost:3000/api/getUserInfo`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (response.data.user) {
              setUser(response.data.user);
              console.log('Navbar', response.data.user);
              return;
            }
          } catch (tokenError) {
            console.error("Token validation failed:", tokenError);
            localStorage.removeItem("token");
          }
        }

        try {
          response = await axios.get(`http://localhost:3000/api/getUserInfo`, {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "x-correlation-id": Date.now().toString(),
            },
          });

          if (response.data.user) {
            setUser(response.data.user);
            console.log('Oauth user data', response.data.user);
          } else {
            throw new Error("No user data received");
          }
        } catch (oauthError) {
          console.error("OAuth login failed:", oauthError);
        }
      } catch (error) {
        console.error("Critical error in fetchUserData:", error);
      } finally {
        setLoading(false)
      }
    };
    if (isLanding === false) {
      fetchUserData();
    }
  }, [isLanding, setUser,]);



  return (
    <div
      className={`flex justify-between ${isLanding ? "absolute z-10" : "border-b"
        } border-[--border-line] items-center h-[60px] pr-5 w-full`}
    >
      {!isLanding && (
        <div
        className={`text-[20px] w-[60px] ${isLanding ? "" : "border- r "
          } border-[--border-line] h-full flex justify-center items-center`}
      >
        <Link to='/'>
        <img src="/images/logo.png" alt="" srcset="" className="rounded-full ml-2 mt-2 mb-2" />
        </Link>
      </div>
      )}

      <div className="flex gap-10 items-center relative">
        {/* Display Avatar if not Landing */}
        {!isLanding &&
          (<>
            <div className="w-[50px] h-[50px] relative" onClick={handleModalOpen}>
                {user?.avatar ?
                  <img
                    src={user?.avatar}
                    alt="Avatar"
                    className="h-[50px] w-[50px] rounded-full"
                  // onError={(e) => {
                  //   e.target.src = "/images/Profile.jpg";
                  // }}
                  />

                  :
                  <img src="/images/Profile.jpg" className="h-[52px] w-[55px] rounded-full" />

                }
            </div>
            {modalopen &&
              <div className="absolute top-[65px] flex flex-col  right-[5px]  bg-[--background3] w-[230px] h-[270px] rounded-sm">
                <div className="w-full flex items-end justify-end px-2 py-2 text-[--ternary]">
                  <div><X size={19} className="hover:scale-[110%]" onClick={() => setModalopen(false)} /></div>
                </div>
                <div className="w-[90%] mx-auto  h-[120px] mt-[5px] ">

                  <div className="w-full flex flex-col gap-3  text-[--ternary] font-semibold justify-center items-center">
                    <div className="w-[70px] h-[70px] relative mx-auto" onClick={handleModalOpen}>
                      {user?.avatar ?
                        <img
                          src={user?.avatar}
                          alt="Avatar"
                          className="h-[70px] w-[70px] rounded-full"
                        // onError={(e) => {
                        //   e.target.src = "/images/Profile.jpg";
                        // }}
                        />

                        :
                        <img src="/images/Profile.jpg" className="h-[70px] w-[70px] rounded-full" />

                      }

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
