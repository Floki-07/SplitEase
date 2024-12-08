import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthHOC = ({ children }) => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      // Get token from localStorage

      
      const token = localStorage.getItem('token');
      
      // If no token exists, immediately set loading to false
      if (!token) {
        console.log('No token found in localStorage');
        setIsLoading(false);
        setIsAuthenticated(false)
        navigate('/login')
        return;
      }

      try {
        // Configure axios request with full details
        const response = await axios.get('http://localhost:3000/api/isLoggedIn', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          // Add timeout to prevent indefinite loading
          timeout: 5000
        });

        // Detailed logging of response
        console.log('Full Login Check Response:', {
          isValid: response.data.isValid,
          data: response.data
        });

        if (response.data.isValid) {
          console.log('User is logged in:', response.data);
          // Optionally redirect to home or keep current page
          setIsAuthenticated(true)
          navigate('/home');
        } else {
          console.log('User is not logged in.');
          // Clear invalid token
          localStorage.removeItem('token');
          setIsAuthenticated(false)
          navigate('/login');
        }
      } catch (error) {
        // Comprehensive error handling
       
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error('Login check server error:', {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers
          });

          // Handle specific error scenarios
          if (error.response.status === 401) {
            // Unauthorized - clear token and redirect to login
            localStorage.removeItem('token');
            navigate('/login');
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request);
        } else {
          // Something happened in setting up the request
          console.error('Error setting up request:', error.message);
        }
      } finally {
        // Always set loading to false
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

  return <>{children}</>;
};
export default AuthHOC;
