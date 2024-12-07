import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [user, setUser] = useState();
  const [avatarUrl, setAvatarUrl] = useState(localStorage.getItem('AvatarUrl') || '');
  
  useEffect(() => {
    axios
      .get(`http://localhost:3000/auth/login/success`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      })
      .then((response) => {
        const fetchedUser = response.data.user;
        setUser(fetchedUser);

        // Save avatar URL to localStorage
        if (fetchedUser?.avatar) {
          localStorage.setItem('AvatarUrl', fetchedUser.avatar);
          setAvatarUrl(fetchedUser.avatar); // Update state
        }
      })
      .catch((error) => console.error('Error fetching user:', error));
  }, []);

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      {user ? (
        <div>
          <p>Hello, {user?.username}</p>
          <img
            src={avatarUrl}
            alt={`Avatar of ${user?.username}`}
            onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
          />
          <p>Email: {user?.email}</p>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Home;
