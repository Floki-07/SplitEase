import React, { useEffect, useState } from 'react';
import { PlusIcon, EditIcon, SaveIcon, TrashIcon, UsersIcon, Trash2Icon } from 'lucide-react';
import { Pencil, Equal } from 'lucide-react'
import Button from '../components/Button';
import axios from 'axios';
import { toast } from 'sonner';
axios.defaults.withCredentials = true;
import { Link } from 'react-router-dom';
const Groups = () => {
  const [groups, setGroups] = useState([]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [isViewGroupOpen, setIsViewGroupOpen] = useState(false)
  const [newGroupAdded, setNewGroupAdded] = useState(false);

  const [newGroup, setNewGroup] = useState({
    name: '',
    members: []
  });
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);



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
              setFriends(userData.friends);
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
            setUser(userData);
            setFriends(userData.friends);
            console.log(userData.friends);
            setGroups(userData.groups);
            console.log(userData.groups);

            return;
          } else {
            // throw new Error("No user data received");
          }
        } catch (oauthError) {
          console.error("OAuth login failed:", oauthError);
          // navigate("/login");
        }
      } catch (error) {
        console.error("Critical error in fetchUserData:", error);
        localStorage.removeItem("token");
        // navigate("/login");
      }
    };

    fetchUserData();
  }, [setUser, newGroupAdded]);



  const handleCreateGroup = async (e) => {
    e.preventDefault();
    setIsCreateModalOpen(false);
    console.log(newGroup);

    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      let response;

      if (token) {
        // Token-based request for adding expense
        try {
          response = await axios.post(
            `http://localhost:3000/api/addnewgroup`,  // API endpoint
            { newGroup },  // Payload with expense data
            {
              headers: {
                Authorization: `Bearer ${token}`,  // Attach token in Authorization header
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data.success) {
            toast.success('Group added successfully', {
              style: {
                color: "green",
              } // Set the text color to green
            })
            setUser(response.data.user);
            setFriends(user.friends);
            setNewGroupAdded(~newGroupAdded)
            setIsCreateModalOpen(false)
          } else {
          }
        } catch (tokenError) {
          console.error("Token-based request failed:", tokenError);
        }
      }

      // OAuth-based request (if no token, use cookies)
      try {
        response = await axios.post(
          `http://localhost:3000/api/addnewgroup`,  // API endpoint
          { newGroup }, // Include the expense data as payload
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
          toast.success('Group added successfully', {
            style: {
              color: "green",
            } // Set the text color to green

          }) // Close the expense modal
          setUser(response.data.user);
          setFriends(user.friends);
          setIsCreateModalOpen(false)
          setNewGroupAdded(~newGroupAdded)
        } else {
          // setErrorMessage(response.data.message || 'An error occurred');
        }
      } catch (oauthError) {
        console.error("OAuth-based request failed:", oauthError);
      }

    } catch (error) {
      console.log(error);
    }


  };



  const handleGroupClick = () => {
    // setIsViewGroupOpen(true)
  }
  const deleteGroup = async (groupId) => {
    console.log(groupId);
    try {
      const token = localStorage.getItem("token");
      let response;

      if (token) {
        // Token-based request for deleting the goal
        try {
          response = await axios.delete(
            `http://localhost:3000/api/deletegroup/${groupId}`, // Updated API endpoint for deletion
            {
              headers: {
                Authorization: `Bearer ${token}`, // Attach token in Authorization header
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            console.log("Group deleted successfully:", response.data.message);
            toast.warning('Group deleted successfully', {
              style: {
                color: "red",
              } // Set the text color to green
            })
            // Optionally update the UI or state based on success
            setNewGroupAdded(~newGroupAdded)
          } else {
            console.error("Failed to delete Group:", response.data.message);
          }
        } catch (tokenError) {
          console.error("Token-based deletion failed:", tokenError);
        }
      } else {
        // OAuth-based request for deleting the Group
        try {
          response = await axios.delete(
            `http://localhost:3000/api/deletegroup/${groupId}`, // Same endpoint for OAuth
            {
              withCredentials: true, // Allows sending cookies
              headers: {
                "Content-Type": "application/json",
                "x-correlation-id": Date.now().toString(), // Correlation ID for tracking
              },
            }
          );

          if (response.data.success) {
            console.log("Goal deleted successfully via OAuth:", response.data.message);
            setNewGroupAdded(~newGroupAdded)
            toast.warning('Group deleted successfully', {
              style: {
                color: "red",
              } // Set the text color to green
            })
          } else {
            throw new Error("No success response received for OAuth deletion");
          }
        } catch (oauthError) {
          console.error("OAuth-based deletion failed:", oauthError);
        }
      }
    } catch (error) {
      console.error("Critical error during goal deletion process:", error);
    }
  };

  return (
    <div
      className="p-4 text-white w-[700px]"
      style={{
        background: '#050D35',
        // fontFamily: 'Inter, sans-serif'
      }}
    >
      <div className="container mx-auto ">
        <h1 className="text-2xl font-bold mb-6 text-[--heading] text-[27px]">All Groups</h1>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="w-[200px] mb-6 py-3 rounded-lg flex items-center justify-center space-x-2"
          style={{
            background: '#796FFE',
            color: 'white'
          }}
        >
          <PlusIcon size={20} />
          <span>Create Group</span>
        </button>



        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div
              key={group._id}
              onClick={handleGroupClick}
              className="bg-[#121944]  rounded-lg p-4 hover:scale-105 transition-all delay-100 shadow-md shadow-black"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">{group.name}</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setCurrentGroup(group);
                      setIsEditModalOpen(true);
                    }}
                    className="text-blue-500"
                  >
                  </button>
                  <button
                    onClick={() => deleteGroup(group._id)}
                    className="text-red-500"
                  >
                    <TrashIcon size={20} />
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-gray-400">Money Spent :₹{group.moneySpent}</p>
              </div>

              <div className="flex items-center text-sm text-gray-400">
                <UsersIcon size={16} className="mr-2" />
                {group.members.map(member => member.name).join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Group Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={() => setIsCreateModalOpen(false)}>
          <div className="bg-[#121944] p-6 rounded-lg w-96" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Create New Group</h2>
            <form onSubmit={handleCreateGroup}>
              <input
                type="text"
                placeholder="Group Name"
                className="w-full p-2 mb-4 bg-[#262C5A] rounded text-white"
                value={newGroup.name}
                onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                required
              />
              <div className="mb-4">
                <h3 className="text-lg mb-2">Select Members</h3>
                {friends.map((friend) => (
                  <div
                    key={crypto.randomUUID()}
                    className="flex items-center mb-2"
                  >
                    <input
                      type="checkbox"
                      id={`friend-${friend._id}`}
                      checked={newGroup.members.some(m => m._id === friend._id)}
                      onChange={() => {
                        const memberExists = newGroup.members.some(m => m._id === friend._id);
                        setNewGroup(prev => ({
                          ...prev,
                          members: memberExists
                            ? prev.members.filter(m => m._id !== friend._id)
                            : [...prev.members, { ...friend, selected: false }]
                        }));
                      }}
                      className="mr-2"
                    />
                    <label htmlFor={`friend-${friend.id}`}>{friend.name}</label>
                  </div>
                ))}
              </div>
              <button
                type='submit'
                className="bg-green-500 text-white px-4 py-2 rounded mx-auto"
                disabled={!newGroup.members.length}
              >
                Create Group
              </button>
            </form>
          </div>
        </div>
      )}


      {/* Modal for grp wise description */}
      {
        isViewGroupOpen &&
        <div className='left container  h-[400px] w-[800px] flex flex-col  '>


          <div className=' mt-2  leftbox absolute right-[80px] top-[100px] translate-y[-10%] h-[440px] w-[500px] bg-[--background2] shadow-lg shadow-black rounded-md'>

            <div className='flex  items-center h-[10vh] gap-5 mt-2  w-[80%] mx-auto'>
              {/* <div>
                <img src="/images/Sample.png" alt="" />
              </div> */}
              <div>
                <h1 className='text-white text-[27px] mt-2 font-semibold'> Buddies Corner</h1>
              </div>
              <div>
                {/* <Pencil className='text-[--primary] translate-y-[-50%] translate-x-5 hover:text-purple-600 hover:scale-105  ' /> */}
              </div>
            </div>
            <div>
              <div className=" card-container custom-scrollbar h-[38vh] pb-2 w-[470px] pr-5 mx-auto rounded-lg overflow-y-auto overflow-x-hidden p-2  mt-4 justify-center">

                {/* cards */}

                <div className=" card mt-3 w-[100%] bg-[--background] h-[70px] rounded-md shadow-md shadow-black flex px-1 justify-between items-center hover:scale-105 transition-all delay-100">
                  <div className=" w-[230px] flex items-center justify-between gap-3">

                    <div className="flex justify-e w-[6vw] items-center gap-3">
                      <div className='h-[35px] w-[35px] rounded-[30px]  flex justify-center my-auto'>

                        <img src="/images/Sample.png" alt=""
                          className='object-contain' />
                      </div>
                      <div className=''>
                        <h2 className='text-white text-[18px] '>Tejas</h2>
                      </div>
                    </div>
                    <div className='w-[100px] text-sm text-[--textgreen]'>
                      <span>
                        Owes you
                      </span>
                    </div>
                    <div className='  '>
                      <h1 className='text-[--textgreen]  text-[18px]'>+500</h1>
                    </div>
                  </div>


                  <div className='flex items-center gap-4'>
                    <button className='hover:scale-105 text-center bg-[#28a745] py-2 px-3 w-[7vw] rounded-md text-bold text-white'>
                      <span className='font-semibold'>Settle</span>
                    </button>


                    <button
                      // onClick={() => deleteGroup(group.id)}
                      className="text-red-500"
                    >
                      <TrashIcon size={20} />
                    </button>
                  </div>
                </div>

                <div className=" card mt-3 w-[100%] bg-[--background] h-[70px] rounded-md shadow-md shadow-black flex px-1 justify-between items-center hover:scale-105 transition-all delay-100">
                  <div className=" w-[230px] flex items-center justify-between gap-3">

                    <div className="flex justify-e w-[6vw] items-center gap-3">
                      <div className='h-[35px] w-[35px] rounded-[30px]  flex justify-center my-auto'>

                        <img src="/images/Sample.png" alt=""
                          className='object-contain' />
                      </div>
                      <div className=''>
                        <h2 className='text-white text-[18px] '>Yasar</h2>
                      </div>
                    </div>
                    <div className='w-[100px] text-sm text-[--textred]'>
                      <span>
                        You owe
                      </span>
                    </div>
                    <div className='  '>
                      <h1 className='text-[--textred]  text-[18px]'>-200</h1>
                    </div>
                  </div>


                  <div className='flex items-center gap-4'>
                    <button className='hover:scale-105 text-center bg-[--textred] py-2 px-3 w-[7vw] rounded-md text-bold text-white'>
                      <span className='font-semibold'>Paid</span>
                    </button>


                    <button
                      // onClick={() => deleteGroup(group.id)}
                      className="text-red-500"
                    >
                      <TrashIcon size={20} />
                    </button>
                  </div>
                </div>
                <div className=" card mt-3 w-[100%] bg-[--background] h-[70px] rounded-md shadow-md shadow-black flex px-1 justify-between items-center hover:scale-105 transition-all delay-100">
                  <div className=" w-[230px] flex items-center justify-between gap-3">

                    <div className="flex justify-e w-[6vw] items-center gap-3">
                      <div className='h-[35px] w-[35px] rounded-[30px]  flex justify-center my-auto'>

                        <img src="/images/Sample.png" alt=""
                          className='object-contain' />
                      </div>
                      <div className=''>
                        <h2 className='text-white text-[18px] '>Sujal</h2>
                      </div>
                    </div>
                    <div className='w-[100px] text-sm text-[--ternary]'>
                      <span>
                        You are Even
                      </span>
                    </div>
                    <div className='  '>
                      <h1 className='text-[--ternary]  text-[18px]'>=</h1>
                    </div>
                  </div>


                  <div className='flex items-center gap-4'>
                    {/* <button className='hover:scale-105 text-center bg-[--textred] py-2 px-3 w-[7vw] rounded-md text-bold text-white'>
                      <span className='font-semibold'>Paid</span>
                    </button> */}


                    <button
                      // onClick={() => deleteGroup(group.id)}
                      className="text-red-500"
                    >
                      <TrashIcon size={20} />
                    </button>
                  </div>
                </div>




              </div>

            </div>

          </div>

        </div>

      }
    </div>
  );
};

export default Groups;