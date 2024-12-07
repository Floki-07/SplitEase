import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthHOC = ({ children }) => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function verifyToken() {
      try {
        // Call the backend route to check authentication status
        const response = await axios.get(
          `http://localhost:3000/api/isLoggedIn`,
          {
            withCredentials: true, // Ensure cookies are sent with the request
          }
        );

        // If the response indicates the user is authenticated
        if (response.data.isValid) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          navigate("/signup");
        }
      } catch (error) {
        console.error("Error verifying authentication:", error);

        // Handle error: assume user is not authenticated
        setIsAuthenticated(false);
        navigate("/signup");
      }
    }

    verifyToken();
  }, [navigate]);

  // Rendering logic
  if (isAuthenticated === null) {
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
