import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthHOC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");

        if (token) {
          // Validate token-based user
          const response = await axios.get(
            "https://splitease-ke7h.onrender.com/api/isLoggedIn",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              withCredentials: true, // If cookies/session are required
              timeout: 5000,
            }
          );

          if (response.data?.isValid) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
            navigate("/login");
          }
        } else {
          // Validate OAuth user
          const response = await axios.get(
            "https://splitease-ke7h.onrender.com/auth/login/success",
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
              timeout: 5000,
            }
          );

          if (response.data?.success) {
            // Optionally store OAuth token in localStorage (if provided)
            console.log("OAuth user authenticated:", response.data);
            if (response.data.token) {
              // localStorage.setItem("token", response.data.token);
            }
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            navigate("/login");
          }
        }
      } catch (error) {
        console.error("Authentication error:", error);
        setIsAuthenticated(false);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  // Rendering logic
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="text-red-500">
        Not Authenticated. Redirecting...
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthHOC;
