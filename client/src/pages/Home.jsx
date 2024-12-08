import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState(null); // State to track user information
  const [avatarUrl, setAvatarUrl] = useState('https://via.placeholder.com/150'); // Fallback avatar

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Token used for email-password login

        if (token) {
          // Attempt to validate token and fetch user info in case of email-password login
          const response = await axios.get(`http://localhost:3000/api/getUserInfo`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const fetchedUser = response.data.user;
          console.log("Response Data from Email-Password Login:", response.data);

          if (fetchedUser) {
            setUser(fetchedUser);

            if (fetchedUser?.avatar) {
              localStorage.setItem("AvatarUrl", fetchedUser.avatar);
              setAvatarUrl(fetchedUser.avatar);
            } else {
              console.log("No avatar found in user data.");
            }
          } else {
            console.log("No user data found.");
          }
        } else {
          // Handle OAuth login if token doesn't exist
          const response = await axios.get(
            `http://localhost:3000/auth/login/success`,
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
              },
            }
          );

          const fetchedUser = response.data.user;
          console.log("Response Data from OAuth Login:", response.data);

          if (fetchedUser) {
            setUser(fetchedUser);

            if (fetchedUser?.avatar) {
              localStorage.setItem("AvatarUrl", fetchedUser.avatar);
              setAvatarUrl(fetchedUser.avatar);
            } else {
              console.log("No avatar found from OAuth user.");
            }
          } else {
            console.log("No user data received from OAuth.");
          }
        }
      } catch (error) {
        console.error("Error while fetching user data:", error);
      }
    };

    // Attempt to fetch user data
    fetchUserData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Welcome to your Dashboard</h1>
      {user ? (
        <div className="user-info">
          <div className="user-avatar">
            {/* Display user's avatar or fallback */}
            <img
              src={avatarUrl}
              alt={user?.username || "User Avatar"}
              // style={{ width: '150px', height: '150px', borderRadius: '50%' }}
            />
          </div>
          <div className="user-details">
            <p>Hello, {user?.username || "Guest"}</p>
            <p>Email: {user?.email || "No email available"}</p>
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
