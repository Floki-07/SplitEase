import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null); // State to track user information
  const [avatarUrl, setAvatarUrl] = useState('https://via.placeholder.com/150'); // Fallback avatar
  const navigate=useNavigate()

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
  
        let response;
        if (token) {
          // Token-based login attempt
          try {
            response = await axios.get(`http://localhost:3000/api/getUserInfo`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
  
            if (response.data.user) {
              setUser(response.data.user);
              if (response.data.user.avatar) {
                localStorage.setItem("AvatarUrl", response.data.user.avatar);
                setAvatarUrl(response.data.user.avatar);
              }
              return;
            }
          } catch (tokenError) {
            console.error("Token validation failed:", tokenError);
            localStorage.removeItem("token");
          }
        }
  
        // OAuth login attempt
        try {
          response = await axios.get(`http://localhost:3000/auth/login/success`, {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "x-correlation-id": Date.now().toString(),
            },
          });
  
          if (response.data.user) {
            setUser(response.data.user);
            if (response.data.user.avatar) {
              localStorage.setItem("AvatarUrl", response.data.user.avatar);
              setAvatarUrl(response.data.user.avatar);
            }
          } else {
            throw new Error("No user data received");
          }
        } catch (oauthError) {
          console.error("OAuth login failed:", oauthError);
          navigate('/login');
        }
      } catch (error) {
        console.error("Critical error in fetchUserData:", error);
        localStorage.removeItem("token");
        navigate('/login');
      }
    };
  
    fetchUserData();
  }, [navigate]);

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
