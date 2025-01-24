import { Pencil } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const BillSplit = () => {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [members, setMembers] = useState([]);
    const [expenses, setExpenses] = useState({});
    const [totalBill, settotalBill] = useState("");
    const [category, setCategory] = useState("");
    const [paidBy, setPaidBy] = useState("");
    const [user, setUser] = useState(null)
    const [userExpense, setUserExpense] = useState(null)
    let groupId = id;

    useEffect(() => {
        const fetchGroupData = async () => {
            try {
                const token = localStorage.getItem("token");
                let response;

                if (token) {
                    try {
                        response = await axios.get(`http://localhost:3000/api/group/${groupId}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });

                        if (response.data.group) {
                            setGroup(response.data.group);
                            setUser(response.data.user)
                            setMembers(response.data.group.members);
                            return;
                        }
                    } catch (tokenError) {
                        console.error("Token validation failed:", tokenError);
                        localStorage.removeItem("token");
                    }
                }

                // OAuth login attempt
                try {
                    response = await axios.get(`http://localhost:3000/api/group/${groupId}`, {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                            "x-correlation-id": Date.now().toString(),
                        },
                    });
                    if (response.data.group) {
                        console.log(response.data);
                        setGroup(response.data.group);
                        setMembers(response.data.group.members);
                        setUser(response.data.user)
                        return;
                    }
                } catch (oauthError) {
                    console.error("OAuth login failed:", oauthError);
                }
            } catch (error) {
                console.error("Critical error in fetchGroupData:", error);
                localStorage.removeItem("token");
            }
        };

        fetchGroupData();
    }, [groupId]);

    const handleExpenseChange = (id, value) => {
        setExpenses((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleExpenseSubmit = async () => {
        const totalExpense = Object.values(expenses).reduce((acc, curr) => acc + Number(curr), 0) + Number(userExpense);
        if (!totalBill || !category || !paidBy) {
            toast.info("Please fill in all required fields.");
            return;
        }

        if (totalExpense <= 0) {
            toast.info("Please enter valid expense amounts.");
            return;
        }
        if (totalExpense > parseInt(totalBill)) {
            toast.info("Expense cannot be greater than total bill.");
            return;
        }


        if (totalExpense < parseInt(totalBill)) {
            toast.info("Expense of users not matching with total bill. ");
            return;
        }

        const expenseData = {
            totalBill,
            category,
            expenses,
            paidBy,
            groupId,
            userExpense
        };

        try {
            const token = localStorage.getItem("token");
            console.log("Token:", token);

            let response;

            if (token) {
                // Token-based request for adding expense
                try {
                    response = await axios.post(
                        `http://localhost:3000/api/group/billsplit`,  // API endpoint
                        { expenseData },  // Payload with expense data
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,  // Attach token in Authorization header
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    if (response.data.success) {
                        console.log("Expense added successfully:", response.data.message);
                        setUser(response.data.user);
                        setMembers(response.data.group.members);
                        settotalBill('')
                        setPaidBy('')
                        setExpenses([])
                        setCategory('')
                        setUserExpense('')
                        toast.success('Bill spliting done successfully.', {
                            style: {
                                color: "green",
                            } // Set the text color to green

                        })
                    } else {
                    }
                } catch (tokenError) {
                    console.error("Token-based request failed:", tokenError);
                }
            }

            // OAuth-based request (if no token, use cookies)
            try {
                response = await axios.post(
                    `http://localhost:3000/api/group/billsplit`,  // API endpoint
                    { expenseData }, // Include the expense data as payload
                    {
                        withCredentials: true, // Allows sending cookies for OAuth
                        headers: {
                            "Content-Type": "application/json",
                            "x-correlation-id": Date.now().toString(), // Correlation ID for tracking
                        },
                    }
                );
                console.log(response.data.message);

                if (response.data.success) {
                    console.log("Expense added successfully:", response?.data?.message);
                    setUser(response.data.user);
                    setMembers(response.data.group.members);
                    settotalBill('')
                    setPaidBy('')
                    setExpenses([])
                    setCategory('')
                    setUserExpense('')

                    toast.success('Bill splitting done successfully', {
                        style: {
                            color: "green",
                        } // Set the text color to green

                    }) // Close the expense modal
                } else {
                    // setErrorMessage(response.data.message || 'An error occurred');
                }
            } catch (oauthError) {
                console.error("OAuth-based request failed:", oauthError);
                // setErrorMessage('OAuth-based request failed');
            }

        } catch (error) {
            // console.error("Critical error during request process:", error);
            console.log(error);

        }
    };

    return (
        <div className="flex">
            <div className="left container h-[600px] w-[40vw] flex flex-col justify- border-r border-gray-300 border-opacity-25 mt-4">
                <h1 className="mt-1 ml-2 text-[30px] text-[--ternary]">Split with group</h1>
                <div className="mt-2 mx-auto leftbox translate-y[-10%] h-[440px] w-[400px] bg-[--background2] shadow-lg shadow-black rounded-md">
                    <div className="flex items-center h-[10vh] gap-5 mt-2 w-[80%] mx-auto">
                        <div className="h-[70px] w-[50px] rounded-full flex justify-center items-center">
                            <img src="/images/Group.jpeg" alt="" height="70px" className="rounded-full object-fill" />
                        </div>
                        <div>
                            <h1 className="text-white text-[24px] mt-2 w-[200px]">{group?.name}</h1>
                        </div>
                    </div>
                    <div>
                        <div className="card-container custom-scrollbar h-[38vh] pb-2 w-[390px] mx-auto rounded-lg overflow-y-auto overflow-x-hidden p-2 mt-4 justify-center">
                            {members.map((friend) => (
                                <div
                                    key={friend?.id}
                                    className="card mt-3 w-[100%] bg-[--background] h-[70px] rounded-md shadow-md shadow-black flex px-1 justify-between items-center hover:scale-105 transition-all delay-100"
                                >
                                    <div className="flex justify-e w-[6vw] items-center gap-3 px-5">
                                        {/* <div className="h-[35px] w-[35px] rounded-[30px] flex justify-center my-auto">
                                            <img src="/images/Sample.png" alt="" className="object-contain" />
                                        </div> */}
                                        <div>
                                            <h2 className="text-white text-[18px]">{friend?.name}</h2>
                                        </div>
                                    </div>
                                    <div
                                        className={`w-[100px] text-sm ${friend?.balance === 0
                                            ? "text-gray-400"
                                            : friend?.balance < 0
                                                ? "text-[--textred]"
                                                : "text-[--textgreen]"
                                            }`}
                                    >
                                        <span>
                                            {friend?.balance === 0
                                                ? "You are even"
                                                : friend?.balance < 0
                                                    ? "You owe"
                                                    : "Owes you"}
                                        </span>
                                    </div>
                                    <div>
                                        <h1
                                            className={`${friend?.balance === 0
                                                ? "text-gray-400"
                                                : friend?.balance < 0
                                                    ? "text-[--textred]"
                                                    : "text-[--textgreen]"
                                                } text-[18px]`}
                                        >
                                            {friend.balance>0 && '+'}
                                            {friend?.balance}
                                        </h1>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="right-container h-[500px] mt-12 w-[40vw] flex flex-col items-center justify-center">
                <div className="right-box h-[600px] overflow w-[396px] bg-[--background2] shadow-lg shadow-black rounded-md">
                    <div className="flex items-center h-[10vh] gap-3 mt-2 w-[80%] mx-auto">
                        <h1 className="text-white text-[24px]">Add Bill</h1>
                    </div>

                    <div className="form-content h-[50vh] w-[80%] mx-auto flex flex-col gap-4">
                        <div className="flex gap-2">
                            <input
                                id="totalBill"
                                type="text"
                                placeholder="Enter bill"
                                value={totalBill}
                                onChange={(e) => settotalBill(e.target.value)}
                                className="h-[40px] w-full bg-[--background] text-white rounded-md px-4 focus:outline-none shadow-md"
                            />
                            <select
                                name="category"
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="bg-[--background2] border border-opacity-20 border-gray-100 outline-none rounded-md px-2 w-[9vw] text-white h-[40px]"
                            >
                                <option value="" disabled>
                                    Category
                                </option>
                                <option value="grocery">Grocery</option>
                                <option value="restaurant">Restaurant</option>
                                <option value="commute">Commute</option>
                                <option value="bills">Bills</option>
                                <option value="stationary">Stationary</option>
                                <option value="trips">Trips</option>
                                <option value="micellaneous">Micellaneous</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[--ternary] text-[18px]">Members</label>
                            <div className="member-list h-[26vh] bg-[--background] rounded-md flex flex-col gap-3 overflow-y-auto custom-scrollbar px-4 py-2 shadow-md">

                                <div className="flex justify-between items-center mb-1 border border-gray-400 border-opacity-20 px-3 py-1 rounded-md">
                                    <span className="text-white">User</span>
                                    <input
                                        type="text"
                                        placeholder="Expense"
                                        value={userExpense || ""}
                                        onChange={(e) => setUserExpense(e.target.value)}
                                        className="h-[30px] w-[80px] bg-[--background2] text-white rounded-md px-2 focus:outline-none shadow-inner"
                                    />
                                </div>
                                {members.map((member) => (
                                    <div key={member?.id} className="flex justify-between items-center mb-1 border border-gray-400 border-opacity-20 px-3 py-1 rounded-md">
                                        <span className="text-white">{member?.name}</span>
                                        <input
                                            type="text"
                                            placeholder="Expense"
                                            value={expenses[member?._id] || ""}
                                            onChange={(e) => handleExpenseChange(member?._id, e.target.value)}
                                            className="h-[30px] w-[80px] bg-[--background2] text-white rounded-md px-2 focus:outline-none shadow-inner"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <select
                                id="paid-by"
                                value={paidBy}
                                onChange={(e) => setPaidBy(e.target.value)}
                                className="h-[40px] w-[35%] bg-[--background] text-white rounded-md px-4 focus:outline-none shadow-md"
                            >
                                <option value="" disabled>
                                    Paid by
                                </option>
                                <option value="user" >
                                    Me
                                </option>
                                {members.map((member) => (
                                    <option key={member?.id} value={member?._id}>
                                        {member?.name}
                                    </option>
                                ))}
                            </select>
                            <div className="flex justify-center mt-1">
                                <button
                                    onClick={handleExpenseSubmit}
                                    className="h-[40px] w-[30%] bg-[--primary] text-white rounded-md hover:scale-105 transition-all shadow-lg"
                                >
                                    Add Bill
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillSplit;
