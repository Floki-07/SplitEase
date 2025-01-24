import React, { useEffect, useState } from 'react';
import { TrashIcon } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

axios.defaults.withCredentials = true;

const Settle = () => {
    const [members, setMembers] = useState([]);
    const [user, setUser] = useState('');
    const [toggle, settoggle] = useState(false)
    useEffect(() => {
        const fetchGroupData = async () => {
            try {
                const token = localStorage.getItem('token');
                let response;

                if (token) {
                    try {
                        response = await axios.get(`http://localhost:3000/api/getallfriends}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });

                        if (response.data.user) {
                            setUser(response.data.user);
                            setMembers(response.data.user.friends);
                            console.log(response.data.user.friends);

                            return;
                        }
                    } catch (tokenError) {
                        console.error('Token validation failed:', tokenError);
                        localStorage.removeItem('token');
                    }
                }

                // OAuth login attempt
                try {
                    response = await axios.get(`http://localhost:3000/api/getallfriends`, {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                            'x-correlation-id': Date.now().toString(),
                        },
                    });
                    if (response.data.user) {
                        setMembers(response.data.user.friends);
                        setUser(response.data.user);
                        console.log(response.data.user.friends);
                        return;
                    }
                } catch (oauthError) {
                    console.error('OAuth login failed:', oauthError);
                }
            } catch (error) {
                console.error('Critical error in fetchGroupData:', error);
                localStorage.removeItem('token');
            }
        };

        fetchGroupData();
    }, [toggle]);

    const settlePayment=async (friendId)=>{
        let obj={friendId}
        try {
            const token = localStorage.getItem("token");
            console.log("Token:", token);

            let response;

            if (token) {
                // Token-based request for adding expense
                try {
                    response = await axios.post(
                        `http://localhost:3000/api/settle/${friendId}`,  // API endpoint
                        { obj },  // Payload with expense data
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,  // Attach token in Authorization header
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    if (response.data.user) {
                        console.log(response.data.user);
                        setMembers(response.data.user.friends)
                    } else {
                    }
                } catch (tokenError) {
                    console.error("Token-based request failed:", tokenError);
                }
            }

            // OAuth-based request (if no token, use cookies)
            try {
                response = await axios.post(
                    `http://localhost:3000/api/settle/${friendId}`,  // API endpoint
                    { obj }, // Include the expense data as payload
                    {
                        withCredentials: true, // Allows sending cookies for OAuth
                        headers: {
                            "Content-Type": "application/json",
                            "x-correlation-id": Date.now().toString(), // Correlation ID for tracking
                        },
                    }
                );
                console.log(response.data.message);

                if (response.data.user) {
                    console.log(response.data.user);
                    setMembers(response.data.user.friends)
                    settoggle(!toggle)


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

    }
   

    return (
        <div className="container h-[80vh] flex justify-center items-center">
    <div className="mt-2 h-[440px] w-[540px] bg-[--background2] shadow-lg shadow-black rounded-md">
        <div className="flex items-center h-[10vh] gap-5 mt-2 w-[80%] mx-auto">
            <h1 className="text-[27px] mt-2 font-semibold">Settle payments with friends</h1>
        </div>
        <div className="card-container custom-scrollbar h-[38vh] pb-2 w-[540px] pr-5 mx-auto rounded-lg overflow-y-auto overflow-x-hidden p-2 mt-4 ">
            {members.map((member) => (
                <div
                    key={member._id}
                    className={`card mt-3 w-full h-[70px] rounded-md shadow-md shadow-black flex px-1 justify-between items-center transition-all delay-100 bg-[--background]`}
                >
                    <div className="w-[340px] bg-re-400 flex items-center justify-between gap-3 mx-auto">
                        <div className="flex items-center gap-3">
                            <h2 className="text-white text-[18px]">{member.name}</h2>
                        </div>
                        <div className={`w-[150px] text-sm ${member.balance === 0 ? 'text-gray-500' : member.balance > 0 ? 'text-[--textgreen]' : 'text-[--textred]'}`}>
                            <span>
                                {member.balance === 0 ? 'You both are even' : member.balance > 0 ? 'Owes you' : 'You owe'}
                            </span>
                        </div>
                        <h1 className={`text-[18px] ${member.balance === 0 ? 'text-gray-500' : member.balance > 0 ? 'text-[--textgreen]' : 'text-[--textred]'}`}>
                            {member.balance === 0 ? `0` : member.balance > 0 ? `+${member.balance}` : `${member.balance}`}
                        </h1>
                    </div>
                    {member.balance !== 0 && (
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => settlePayment(member._id)}
                                className={`${member.balance > 0 ? 'bg-[#28a745]' : 'bg-[#dc3545]'
                                    } hover:scale-105 text-center py-2 px-3 w-[7vw] rounded-md text-bold text-white`}
                            >
                                <span className="font-semibold">{member.balance > 0 ? 'Settle' : 'Paid'}</span>
                            </button>
                        </div>
                    )}
                            {/* <button className="text-red-500">
                                <TrashIcon size={20} />
                            </button> */}
                </div>
            ))}
        </div>
    </div>
</div>

    );
};

export default Settle;