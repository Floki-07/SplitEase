import React, { useEffect } from 'react'
import { Search, Plus, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import SplitFriendModal from '../components/SplitFriendModal'

const FriendSplit = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAddModalOpen, setisAddModalOpen] = useState(false)
  const [friendName, setFriendName] = useState('')
  const [Phone, setPhone] = useState('')
  const [user, setUser] = useState('')
  const [addedFriend, setaddedFriend] = useState(false)
  const [selectedFriend, setSelectedFriend] = useState('')

  const imgSelect = Math.random() < 0.5 ? 1 : 2;
  const handleSearch = () => {

  }
 

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
              console.log(userData.friends);
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
            console.log(userData.friends);
            return;
          } else {
            throw new Error("No user data received");
          }
        } catch (oauthError) {
          console.error("OAuth login failed:", oauthError);
        }
      } catch (error) {
        console.error("Critical error in fetchUserData:", error);
        localStorage.removeItem("token");
      }
    };

    fetchUserData();
  }, [setUser, addedFriend]);

  const handleSubmit = async (e) => {
    e.preventDefault();



    try {
      const token = localStorage.getItem("token");
      let response;
      let obj = { name: friendName, phone: Phone };

      if (token) {
        // Token-based onboarding request
        try {
          const response = await axios.post(
            `http://localhost:3000/api/addfriend`,  // API endpoint
            { obj },  // Payload with the budget
            {
              headers: {
                Authorization: `Bearer ${token}`,  // Attach token in Authorization header
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data.success) {
            console.log("Friend add successfully:", response.data.message);
            // Optionally redirect or update UI based on success
            setUser(response.data.user)
            toast.success('Added new Friend', {
              style: {
                color: "green",
              } // Set the text color to green
            })
            setaddedFriend(!addedFriend)

          } else {
            console.error("Onboarding failed:", response.data.message);
          }
        } catch (tokenError) {
          console.error("Token-based onboarding failed:", tokenError);
        }
      }

      // OAuth-based onboarding request
      try {
        response = await axios.post(
          `http://localhost:3000/api/addfriend`,
          { obj }, // Include the budget as payload
          {
            withCredentials: true, // Allows sending cookies
            headers: {
              "Content-Type": "application/json",
              "x-correlation-id": Date.now().toString(), // Correlation ID for tracking
            },
          }
        );

        if (response.data.success) {
          setUser(response.data.user)
          console.log(response.data.user);
          toast.success('Added new Friend', {
            style: {
              color: "green",
            } // Set the text color to green

          })
          setaddedFriend(!addedFriend)

        } else {
          throw new Error("No success response received for OAuth onboarding");
        }
      } catch (oauthError) {
        console.error("OAuth-based onboarding failed:", oauthError);
      }
    } catch (error) {
      console.error("Critical error during onboarding process:", error);
    }
    setPhone('')
    setFriendName('')
    setisAddModalOpen(false)
  }
  const [toggle, setToggle] = useState(false)


  return (
    <div className=' flex justify-center items-center w-full h-full'>
      <div className='fixed h-[70vh] w-[32vw] bg-[--background2] rounded-md flex flex-col p-2  shadow-black translate-y-[-10%] border border-white border-opacity-10 z-10'>

        <h1 className='text-[31px] text-[#3C9A87]  font-semibold text-center'>Select friend</h1>
           <div className="mb-4">
          <div className="relative w-[80%] mx-auto">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
              <Search className="w-5 h-5 text-[--ternary] hover:text-[--primary] cursor-pointer transition-colors" onClick={handleSearch} />
            </div>
            <input 
              type="text" 
              className="input-focus w-full bg-[--background] text-[--ternary] pl-12 pr-4 py-3 rounded-xl outline-none placeholder-gray-400"
              placeholder="Search friends..."
            />
          </div>
        </div>
<div className="card-container h-[38vh] w-[29vw] mx-auto mt-2 rounded-lg overflow-y-auto p-2 custom-scrollbar bg-[--background3]">

  {user?.friends && user.friends.length > 0 ? (
    user.friends.map((friend, index) => (
      <div
        key={friend._id}
        className="card mt-3 w-full bg-[--background] h-[70px] rounded-md shadow-md shadow-black flex px-1 justify-between items-center hover:scale-100 hover:text-violet-500 transition-all delay-100"
        onClick={() => setSelectedFriend(friend)}
      >
        <div className="flex justify-between hover:text-violet-500 w-[200px] items-center gap-3 min-h-[50px]">
          <div className="hover:text-violet-500 h-[45px] w-[55px] rounded-[30px] flex justify-center my-auto">
            <img
              src={`/images/Friends/user.png`}
              alt="Friend"
              className="object-contain rounded-full"
            />
          </div>
          <div className="w-[200px] hover:text-violet-500">
            <h2 className="text-white text-lg">{friend.name}</h2>
          </div>
        </div>
        <div className="w-[2vw] h-[4vh] text-white">
          <Plus
            className="hover:cursor-pointer hover:text-violet-500 hover:scale-105"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </div>
    ))
  ) : (
    <div className="text-center text-white text-sm mt-10">
      Please add friends to view list info.
    </div>
  )}
</div>


        <div className=' w-[80%] mt-2 text-white flex justify-end  items-end '>
          <button onClick={() => setisAddModalOpen(true)} className='flex bg-[--primary] px-2 py-1 rounded-md translate-x-[50%] hover:bg-[--primarydark] w-[7vw] justify-center items-center gap-2 hover:cursor-pointer transition-all duration-300 '>
            <span className='font-semibold'>Add</span> <Plus /></button>
        </div>


      </div>

      {isOpen && (
        <SplitFriendModal
          friend={selectedFriend}
          user={user}
          setUser={setUser}
          setIsOpen={setIsOpen}
        />
      )}


      {isAddModalOpen && (
        <>
          <div onClick={() => setisAddModalOpen(false)} className="h-full w-full absolute bg-black/60 top-0 left-0 flex items-center z-[10]">

            <div className="modal justify-center items-center relative bg-[#121944] h-[300px] w-[380px] mx-auto rounded-md translate-x-8 translate-y-[-10%] z-[20] px-8 py-6 flex flex-col gap-3" onClick={(e) => e.stopPropagation()}>

              <form onSubmit={handleSubmit}>
                <div className="min-h-[3vh]  flex flex-col w-[90%]  gap-4 items-center justify-center  ">
                  <h1 className='text-[30px] translate-y-[-20%] text-[--heading] font-semibold '>Add new friend</h1>

                  <input
                    type="text"
                    className="text-xl outline-none text-white  w-[240px] bg-[var(--background)] placeholder:text-gray-400 h-[6vh] pl-1"
                    placeholder="Friend's name "
                    autoFocus
                    value={friendName}
                    onChange={(e) => setFriendName(e.target.value)}

                  />


                  <div>
                    <input
                      type="number"
                      className="appearance-none text-xl outline-none text-white  w-[240px] bg-[var(--background)] placeholder:text-gray-400 h-[6vh] pl-1"
                      placeholder="Phone number "
                      autoFocus
                      value={Phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div>
                  </div>

                </div>









                <div className='w-full justify-center flex'>
                  <button type='submit' className=' hover:bg-violet-600 text-center bg-[--primary] py-2 px-4 w-[10vw] rounded-md text-bold text-white'>
                    <span className='font-semibold'>Add </span>
                  </button>
                </div>

              </form>
            </div>


          </div>
        </>
      )}

    </div>
  )
}

export default FriendSplit
