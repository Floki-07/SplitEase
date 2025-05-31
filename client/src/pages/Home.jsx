import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { parsePath, useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;
import CircularProgressBar from "../components/CircularProgressBar";
import { ChevronDown, ChevronUp, Goal } from "lucide-react";
import PieChartComponent from "../components/PieChart";
import Onboarding from "../components/Onboarding";

const initialCategories = [
  'Grocery', 'Restaurant', 'Commute', "Bills", 'Stationary', 'Trips', "Micellaneous"
]



const Home = ({ avatarUrl, setAvatarUrl }) => {
  const [user, setUser] = useState('')
  const [toggleScrollBtn, setToggleScrollBtn] = useState(true)
  const [categories, setcategories] = useState(initialCategories)
  const navigate = useNavigate()
  const middleRef = useRef(null); // Create a ref for the target element
  const topRef = useRef(null); // Create a ref for the target element
  const [expenseIncomePercentage, setExpenseIncomePercentage] = useState()

  const handleScrollUp = () => {
    if (topRef.current) {
      const offsetTop = topRef.current.offsetTop; // Get the top position of the target element
      window.scrollTo({
        top: offsetTop - 100, // Subtract 100px for extra scroll
        behavior: 'smooth', // Smooth scrolling
      });
      setToggleScrollBtn(true);
    }
  };

  const handleScrollDown = () => {
    if (middleRef.current) {
      const offsetTop = middleRef.current.offsetTop; // Get the top position of the target element
      window.scrollTo({
        top: offsetTop + 200, // Subtract 100px for extra scroll
        behavior: 'smooth', // Smooth scrolling
      });
      setToggleScrollBtn(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
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
              const userData = response.data.user;
              setUser(userData);
              console.log(userData.goals);

              const expensePercentage = userData.totalincome
                ? (parseFloat(userData.totalexpense || 0) / parseFloat(userData.totalincome)) * 100
                : 0;

              const remainingPercentage = expensePercentage;

              setExpenseIncomePercentage(remainingPercentage);

              if (userData.avatar) {
                localStorage.setItem("AvatarUrl", userData.avatar);
                setAvatarUrl(userData.avatar);
              }
              return;
            }
          } catch (tokenError) {
            console.error("Token validation failed:", tokenError);
            localStorage.removeItem("token");
          }
        }

        // OAuth login attempt
        try {
          response = await axios.get(`http://localhost:3000/api/getUserInfo`, {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "x-correlation-id": Date.now().toString(),
            },
          });

          if (response.data.user) {
            const userData = response.data.user;
            setUser(userData);
            const expensePercentage = userData.totalincome
              ? (parseFloat(userData.totalexpense || 0) / parseFloat(userData.totalincome)) * 100
              : 0;

            const remainingPercentage = expensePercentage;

            setExpenseIncomePercentage(remainingPercentage);
            if (userData.avatar) {
              localStorage.setItem("AvatarUrl", userData.avatar);
              setAvatarUrl(userData.avatar);
            }
          } else {
            throw new Error("No user data received");
          }
        } catch (oauthError) {
          console.error("OAuth login failed:", oauthError);
          navigate("/login");
        }
      } catch (error) {
        console.error("Critical error in fetchUserData:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate, setAvatarUrl, setUser]);


  return (
    <div className="dashboard-container custom-scrollbar">
      {user ? (
        user.verified ? (
          <div className="bg-[#050D35] min-h-screen text-white p-6 flex flex-col  border-l border-white border-opacity-[15%] border-width-[1px] custom-scrollbar">
            {/* Header */}

            <div id="top" ref={topRef} className="w-full flex justify-between items-center mb-2 mt-3">
              <h1 className="text-white text-[26px] font-bold">
                Welcome back <span className="text-[#3C9A87]">{user?.username} 👋</span>
              </h1>
             
            </div>
          <div className="">
             <h1 className="text-[21px] font-semibold text-[#3C9A8 7] text-[--textgreen]  tracking-wide"><span className="text-white">Your Wallet Balance: </span>₹ {user.totalincome - user.totalexpense}</h1>
          </div>
            {/* Main Dashboard Section */}
            <div className="flex flex-wrap gap-6 justify-start w-[1200px] mt-[20px]">
              {/* Budget vs Expense */}
              <div className="bg-[#121944] rounded-lg p-6 flex flex-col items-center w-[350px] h-[350px]">
                <h2 className="text-[#3C9A87] font-semibold mb-4 text-[25px]"> Expense vs Balance </h2>
                <CircularProgressBar percentage={Math.round(expenseIncomePercentage)} title={'Income Used'} />
              </div>

              {/* Monthly Stats */}
              <div className="bg-[#121944] rounded-lg p-6 flex flex-col w-[350px] justify-start items-center h-[350px]">
                <h2 className="text-[#3C9A87] font-semibold mb-4 text-[25px]">Monthly Stats</h2>
                <ul className="space-y-4 text-xl font-normal w-full">
                  <li className="flex justify-between">
                    <span>Income this month</span>
                    <span className="font-bold">₹ {user.totalincome}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Expense this month:</span>
                    <span className="font-bold">₹ {user.totalexpense}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Your budget:</span>
                    <span className="font-bold">₹ {user.budget}</span>
                  </li>
                  {/* <li className="flex justify-between">
                    <span>Amount owed:</span>
                    <span className="font-bold">₹ {user.amountowed}</span>
                  </li> */}
                  {/* <li className="flex justify-between">
                    <span>Amount you owe:</span>
                    <span className="font-bold">₹ {user.amountheowes}</span>
                  </li> */}
                  <li className="flex justify-between">
                    <span>Amount Spent in <br />Groups:</span>
                    <span className="font-bold">₹ {user.amountspent}</span>
                  </li>
                </ul>
              </div>

              {/* Active Goals */}
              <div className="bg-[#121944] rounded-lg p-6 w-[430px] text-center h-[350px]">
                <h2 className="text-[#3C9A87] font-semibold mb-4 text-[25px]">Active Goals</h2>

                <div className="container savings flex flex-col overflow-y-auto custom-scrollbar h-[250px] overflow-x-hidden w-[390px] px-2 gap-2">
                  {
                    user?.goals?.filter((goal) => !goal?.completed).length > 0 ? (
                      user?.goals
                        ?.filter((goal) => !goal?.completed)
                        .map((goal) => (

                          <div key={crypto.randomUUID()} className="flex items-center gap-4 mt-2 bg-[--background] rounded-md w-[350px] min-h-[150px] px-3 overflow-y-auto custom-scrollbar">
                            <CircularProgressBar percentage={goal?.progress} radiusinput={15} strokeInput={10} size={120} showtext={true} title={''} />
                            <div className="min-h-[150px] flex justify-center items-center ">
                              <h1 className="text-[28px] font-semibold tracking-wide">{goal?.name}</h1>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="text-[--ternary] text-center mt-8"><div className="flex mx-auto w-[50%] gap-5">
                        No active goals <Goal /></div></div>
                    )
                  }
                </div>
              </div>


              {/* Scroll Down */}
              {toggleScrollBtn !== false && (
                <div className="flex w-full justify-end">
                  <div
                    onClick={handleScrollDown}
                    className="w-[40px] h-[40px] relative bg-[--ternary] rounded-full flex justify-center items-center"
                  >
                    <ChevronDown className="text-black" size={25} />
                  </div>
                </div>
              )}

              {/* Category wise Split */}
              <div className="flex flex-col items-center w-[98%] rounded-md bg-[--background2] h-[400px] middle mt-[100px]" id="middle" ref={middleRef}>
                <div className="flex justify-between items-center mb-2 mt-1">
                  <h1 className="text-white text-[26px] font-bold">
                    <span className="text-[--heading]">Category Wise Split</span>
                  </h1>
                </div>

                <div className="flex">
                  <div className="w-[50%] h-[400px]">
                    {
                      user !== null ? (
                        <PieChartComponent user={user} />
                      ) : (
                        <div>Loading...</div> // Display a loading message or spinner
                      )
                    }
                  </div>
                  <div className="w-[60%] pl-10 h-[400px]">
                    <div className="category p-2 container w-[100%] mx-auto pl-20 h-[80%] my-4 gap-2 flex flex-wrap border-l border-white border-opacity-20">
                      {categories.map((item, index) => (
                        <div
                          key={index}
                          className="w-[150px] rounded-md px-1 h-[90px] bg-[--background3] z-10 gap-2 flex flex-col justify-start items-start"
                        >
                          <h1 className="text-[--primary] text-[24px] font-semibold">{item}</h1>
                          <span className="ml-1 text-[17px] font-bold">₹{user?.categorywise[item.toLowerCase()]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Scroll Up */}
              <div className="flex w-full justify-end mb-[100px]">
                <div
                  onClick={handleScrollUp}
                  className="w-[40px] h-[40px] relative bg-[--ternary] rounded-full flex justify-center items-center"
                >
                  <ChevronUp className="text-black" size={25} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div><Onboarding /></div>
        )
      ) : (
        <div>
          <p>Loading user info...</p>
        </div>
      )}
    </div>
  );
};

export default Home;
