import React, { useState } from 'react';
import { PlusIcon, EditIcon, SaveIcon, TrashIcon, UsersIcon, Trash2Icon } from 'lucide-react';
import { Pencil, Equal } from 'lucide-react'
import Button from '../components/Button';

const Groups = () => {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: 'Buddies Corner',
      members: [
        { id: 1, name: 'Sujal', selected: false },
        { id: 2, name: 'Tejas', selected: false },
        { id: 3, name: 'Yasar', selected: false }
      ],
      recentBill: 'Restaurant'
    },
    // {
    //   id: 2,
    //   name: 'Weekend Crew',
    //   members: [
    //     { id: 4, name: 'David', selected: false },
    //     { id: 5, name: 'Eve', selected: false }
    //   ],
    //   recentBill: 'Dinner'
    // }
  ]);

  const [friends] = useState([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'David' },
    { id: 5, name: 'Eve' },
    { id: 6, name: 'Frank' }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [isViewGroupOpen, setIsViewGroupOpen] = useState(false)
  const [newGroup, setNewGroup] = useState({
    name: '',
    members: []
  });

  const createNewGroup = () => {
    if (newGroup.name && newGroup.members.length > 0) {
      const group = {
        id: groups.length + 1,
        name: newGroup.name,
        members: newGroup.members,
        recentBill: ''
      };
      setGroups([...groups, group]);
      setIsCreateModalOpen(false);
      setNewGroup({ name: '', members: [] });
    }
  };

  const editGroup = () => {
    if (currentGroup) {
      const updatedGroups = groups.map(group =>
        group.id === currentGroup.id ? currentGroup : group
      );
      setGroups(updatedGroups);
      setIsEditModalOpen(false);
    }
  };

  const handleGroupClick = () => {
    setIsViewGroupOpen(true)
  }

  const deleteGroup = (groupId) => {
    setGroups(groups.filter(group => group.id !== groupId));
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
        <h1 className="text-2xl font-bold mb-6 text-[--heading] text-[27px]">Bill Split Groups</h1>

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
              key={group.id}
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
                    <EditIcon size={20} />
                  </button>
                  <button
                    onClick={() => deleteGroup(group.id)}
                    className="text-red-500"
                  >
                    <TrashIcon size={20} />
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-gray-400">Money Spent Rs.1000</p>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#121944] p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create New Group</h2>
            <input
              type="text"
              placeholder="Group Name"
              className="w-full p-2 mb-4 bg-[#262C5A] rounded text-white"
              value={newGroup.name}
              onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
            />
            <div className="mb-4">
              <h3 className="text-lg mb-2">Select Members</h3>
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center mb-2"
                >
                  <input
                    type="checkbox"
                    id={`friend-${friend.id}`}
                    checked={newGroup.members.some(m => m.id === friend.id)}
                    onChange={() => {
                      const memberExists = newGroup.members.some(m => m.id === friend.id);
                      setNewGroup(prev => ({
                        ...prev,
                        members: memberExists
                          ? prev.members.filter(m => m.id !== friend.id)
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
              onClick={createNewGroup}
              className="w-full py-3 rounded-lg flex items-center justify-center space-x-2"
              style={{
                background: '#796FFE',
                color: 'white'
              }}
            >
              <SaveIcon size={20} />
              <span>Save Group</span>
            </button>
          </div>
        </div>
      )}

      {/* Edit Group Modal */}
      {isEditModalOpen && currentGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#121944] p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Group</h2>
            <input
              type="text"
              placeholder="Group Name"
              className="w-full p-2 mb-4 bg-[#262C5A] rounded text-white"
              value={currentGroup.name}
              onChange={(e) => setCurrentGroup({ ...currentGroup, name: e.target.value })}
            />
            <div className="mb-4">
              <h3 className="text-lg mb-2">Select Members</h3>
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center mb-2"
                >
                  <input
                    type="checkbox"
                    id={`edit-friend-${friend.id}`}
                    checked={currentGroup.members.some(m => m.id === friend.id)}
                    onChange={() => {
                      const updatedMembers = currentGroup.members.some(m => m.id === friend.id)
                        ? currentGroup.members.filter(m => m.id !== friend.id)
                        : [...currentGroup.members, { ...friend, selected: false }];

                      setCurrentGroup({
                        ...currentGroup,
                        members: updatedMembers
                      });
                    }}
                    className="mr-2"
                  />
                  <label htmlFor={`edit-friend-${friend.id}`}>{friend.name}</label>
                </div>
              ))}
            </div>
            <button
              onClick={editGroup}
              className="w-full py-3 rounded-lg flex items-center justify-center space-x-2"
              style={{
                background: '#796FFE',
                color: 'white'
              }}
            >
              <SaveIcon size={20} />
              <span>Save Changes</span>
            </button>
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