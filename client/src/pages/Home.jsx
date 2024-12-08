import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [user, setUser] = useState();
  const [avatarUrl, setAvatarUrl] = useState(localStorage.getItem('AvatarUrl'));

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Token used for email-password login
        
        if (token) {
          // Attempt to validate the token and fetch user info in case of email-password login
          const response = await axios.get(`http://localhost:3000/api/getUserInfo`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const fetchedUser = response.data.user;
          console.log('Email-Password Login Data:', fetchedUser);

          setUser(fetchedUser);

          if (fetchedUser?.avatar) {
            localStorage.setItem('AvatarUrl', fetchedUser.avatar);
            setAvatarUrl(fetchedUser.avatar);
          }
        } else {
          // If it's an OAuth login
          const response = await axios.get(`http://localhost:3000/auth/login/success`, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': true,
            },
          });

          const fetchedUser = response.data.user;
          console.log('OAuth Login Data:', fetchedUser);

          setUser(fetchedUser);

          if (fetchedUser?.avatar) {
            localStorage.setItem('AvatarUrl', fetchedUser.avatar);
            setAvatarUrl(fetchedUser.avatar);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Welcome to your Dashboard</h1>
      {user ? (
        <div className="user-info">
          <div className="user-avatar">
            <img
              src={avatarUrl || 'https://via.placeholder.com/150'}
              alt={user?.username}
              // style={{ width: '150px', height: '150px', borderRadius: '50%' }}
            />
          </div>
          <div className="user-details">
            <p>Hello, {user?.username}</p>
            <p>Email: {user?.email}</p>
          </div>
        </div>
      ) : (
        <div>
          <p>Loading user info...</p>
        </div>
      )}
    </div>
  );
};

export default Home;
