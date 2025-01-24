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
      <div className='fixed h-[65vh] w-[28vw] bg-[--background2] rounded-md flex flex-col p-2 shadow-lg shadow-black translate-y-[-10%]'>

        <h1 className='text-[25px] font-semibold text-center'>Select friend</h1>
        <div className='mt-3 bg-[--background] w-[20vw] mx-auto py-2 rounded-[20px] h-[40px] pl-2 flex gap-3 justify-start outline-none focus:outline-none' >

          <div ><Search className='hover:cursor-pointer hover:text-purple-600' onClick={handleSearch} /></div>
          <input type="text" name="" id="" className=' text-[--ternary] bg-inherit outline-none border-solid  border-b border-[#B8B8FF] ' placeholder='Search' />

        </div>

        <div className=" card-container h-[38vh] bg-[background3] w-[24vw] mx-auto mt-4 rounded-lg overflow-y-auto p-2 custom-scrollbar ">

          {
            user?.friends?.map((friend, index) => (
              <div
                key={crypto.randomUUID()}
                className="card mt-3 w-full bg-[--background] h-[9vh] rounded-md shadow-md shadow-black flex px-1 justify-between items-center hover:scale-105 transition-all delay-100"
                onClick={() => setSelectedFriend(friend)}
              >
                <div className="flex justify-between w-[200px] items-center gap-3 min-h-[50px]">
                  <div className='h-[45px] w-[55px] rounded-[30px] flex justify-center my-auto bg-white'>
                    <img
                      src={`/images/Friends/${index % 2 === 0 ? '1' : '2'}.png`}
                      alt="Friend"
                      className='object-contain rounded-full'
                    />
                  </div>
                  <div className='w-[200px]'>
                    <h2 className='text-white text-lg'>{friend.name}</h2>
                  </div>
                </div>
                <div className='w-[2vw] h-[4vh]'>
                  <Plus
                    className='hover:cursor-pointer hover:text-[--ternary] hover:scale-105'
                    onClick={() => setIsOpen(true)}
                  />
                </div>
              </div>
            ))
          }



        </div>


        <div className=' w-[80%] mt-2 text-white flex justify-end  items-end '>
          <button onClick={() => setisAddModalOpen(true)} className='flex bg-[--background3] px-2 py-1 rounded-md translate-x-[50%] hover:bg-[--primary]'>
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
                  <h1 className='text-[30px] translate-y-[-20%] '>Add new friend</h1>

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
                  <button type='submit' className=' hover:bg-violet-600 text-center bg-[--primary] py-2 px-3 w-[7vw] rounded-md text-bold text-white'>
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
