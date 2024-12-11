import React, { useRef } from "react";
import CircularProgressBar from "../components/CircularProgressBar";

const Dashboard = () => {
    const middleRef = useRef(null); // Create a ref for the target element

    const handleScroll = () => {
        if (middleRef.current) {
            middleRef.current.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling
        }
    };
    return (
        <div className="bg-[#050D35] min-h-screen text-white p-6 flex flex-col items-center border-l border-white border-opacity-[15%] border-width-[1px] custom-scrollbar">
            {/* Header */}
            <div className="w-full flex justify-between items-center mb-3">
                <h1 className="text-white text-[26px] font-bold">
                    Welcome back <span className=" text-[#3C9A87]">Tejas!</span>
                </h1>
                <h1 className="text-[28px] font-semibold text-[#3C9A87] tracking-wide">Balance: ₹12,000</h1>
            </div>

            {/* Main Dashboard Section */}
            <div className="flex flex-wrap gap-6 justify-start w-[1200px] ">
                {/* Budget vs Expense */}
                <div className="bg-[#121944] rounded-lg p-6 flex flex-col items-center w-[350px] h-[350px]">
                    <h2 className="text-[#3C9A87] font-semibold mb-4 text-[25px]">Budget vs Expense</h2>
                    <CircularProgressBar percentage={40} />

                </div>

                {/* Monthly Stats */}
                <div className="bg-[#121944] rounded-lg p-6 flex flex-col w-[350px] justify-start items-center  h-[350px]">
                    <h2 className="text-[#3C9A87] font-semibold mb-4 text-[25px]">Monthly Stats</h2>
                    <ul className="space-y-4 text-xl font-normal w-full">
                        <li className="flex justify-between">
                            <span>Income this month:</span>
                            <span className="font-bold">₹42,000</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Expense this month:</span>
                            <span className="font-bold">₹12,000</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Amount owed:</span>
                            <span className="font-bold">₹1,000</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Amount Spent in <br />Groups:</span>
                            <span className="font-bold">₹500</span>
                        </li>
                    </ul>
                </div>
                <input type="button" onClick={handleScroll}  className="bg-red-400"/>


                {/* Active Goals */}
                <div className="bg-[#121944] rounded-lg p-6 w-[430px] text-center  h-[350px]">
                    <h2 className="text-[#3C9A87] font-semibold mb-4 text-[25px]">Active Goals</h2>


                    <div className="container savings flex flex-col overflow-y-auto custom-scrollbar   h-[250px] overflow-x-hidden w-[390px]  px-2 gap-2">

                        <div className="flex items-center gap-4 mt-2 bg-[--background] rounded-md w-[350px] min-h-[150px] px-3 overflow-y-auto custom-scrollbar">
                            <CircularProgressBar percentage={10} radiusinput={15} strokeInput={10} size={120} showtext={true} />
                            <div className="min-h-[150px] flex justify-center items-center ">
                                <h1 className="text-[28px] font-semibold tracking-wide"> Buy Iphone </h1 >
                            </div>

                        </div>
                        <div className="flex items-center gap-4 mt-2 bg-[--background] rounded-md w-[350px] min-h-[150px] px-3 overflow-y-auto custom-scrollbar">
                            <CircularProgressBar percentage={10} radiusinput={15} strokeInput={10} size={120} showtext={true} />
                            <div className="min-h-[150px] flex justify-center items-center ">

                                <h1 className="text-[28px] font-semibold tracking-wide"> Buy Continental GT 650 </h1 >
                            </div>

                        </div>

                    </div>
                </div>

                {/* Category wise Split */}

                <div className="flex w-[90%] bg-red-500 h-[600px] middle" id="middle " ref={middleRef}>

                    <div className=""></div>
                    <div className=""></div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
