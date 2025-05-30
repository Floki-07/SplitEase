import React, { useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'

const GroupSplit = () => {
  const [groups, setGroups] = useState([]);
  const location = useLocation();
  const navigate = useNavigate()



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
              setGroups(userData.groups);
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
            setGroups(userData.groups);
            console.log('', userData.groups);



            return;
          } else {
            // throw new Error("No user data received");
          }
        } catch (oauthError) {
          console.error("OAuth login failed:", oauthError);
        }
      } catch (error) {
        console.error("Critical error in fetchUserData:", error);

      }
    };

    fetchUserData();
  }, []);




  return (
    <div className="flex flex-col flex-wrap gap-6  w-full px-4 ">
      <h1 className='text-2xl font-bold mb-2 mt-2 text-[--heading] text-[27px]' >Split with group</h1>
      {groups.length > 0 ? (
        groups.map((group) => (
          <Link to={`/split/billsplit/${group._id}`} key={group._id}>
            <div className="hover:scale-105 border border-[--ternary] h-[250px] w-[220px] bg-gradient-to-r from-[--background2] to-[--background] flex flex-col shadow-md rounded-md p-4">
              <h2 className="text-xl font-bold text-white mb-3">{group.name}</h2>
              <div className="flex flex-col items-start justify-start w-full">
                <span className="text-[--heading] text-sm mb-2">Team members</span>
                <div className="mt-2 flex flex-col rounded-md w-full bg-[--background2] text-[--ternary] text-sm px-3 py-2 overflow-auto max-h-[120px] scrollbar-thin scrollbar-thumb-[--heading] scrollbar-track-[--background]">
                  {group.members.length > 0 ? (
                    group.members.map((member) => (
                      <p key={member._id}>{member.name}</p>
                    ))
                  ) : (
                    <h1 className="text-white text-lg">You don't have any friends</h1>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-white text-2xl mb-4">You have not made any groups</h1>
          <button
            onClick={() => navigate("/groups")}
            className="px-6 py-2 bg-[--background2] text-white rounded-md hover:bg-[--heading] transition-all"
          >
            Create a Group
          </button>
        </div>
      )}
    </div>
  )
}

export default GroupSplit