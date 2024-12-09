import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthHOC = ({ children }) => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('token');

      try {
        // First, try OAuth login check
        if (!token) {
          const response = await axios.get('http://localhost:3000/auth/login/success', {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
            timeout: 5000
          });

          if (response.data?.success) {
            localStorage.setItem('token', response.data.token || '');
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            navigate('/login');
          }
        } else {
          // Fallback to token-based validation
          const response = await axios.get('http://localhost:3000/api/isLoggedIn', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            timeout: 5000
          });

          if (response.data.isValid) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            navigate('/login');
          }
        }
      } catch (error) {
        console.error('Authentication error:', error);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkLoggedIn();
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

  return <>
    {isAuthenticated && <>{children}</>}
  </>;
};
export default AuthHOC;
