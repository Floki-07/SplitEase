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
    
      if (!token) {
        console.log('No token found in localStorage, attempting OAuth login check');
        try {
          // Attempt OAuth login check if no token is found
          const response = await axios.get('http://localhost:3000/auth/login/success', {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
            timeout: 5000,
          });
    
          console.log('OAuth login check response:', response.data);
    
          if (response.data?.success) { // Check `success` instead of `isLoggedIn`
            console.log('User is authenticated via OAuth');
            localStorage.setItem('token', response.data.token || ''); // Set token if server sends it
            setIsAuthenticated(true);
           
          } else {
            console.log('OAuth login failed or user not authenticated');
            setIsAuthenticated(false);
            navigate('/login');
          }
        } catch (error) {
          console.error('Error during OAuth login check:', error);
          setIsAuthenticated(false);
          navigate('/login');
        } finally {
          setIsLoading(false);
        }
        return;
      }
    
      try {
        // Token-based login validation
        const response = await axios.get('http://localhost:3000/api/isLoggedIn', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          timeout: 5000,
        });
    
        console.log('Token-based login check response:', response.data);
    
        if (response.data.isValid) {
          console.log('User is logged in with token');
          setIsAuthenticated(true);
          navigate('/home');
        } else {
          console.log('Token invalid, clearing token');
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          navigate('/login');
        }
      } catch (error) {
        if (error.response) {
          console.error('Server returned error during token check:', {
            status: error.response.status,
            data: error.response.data,
          });
        } else {
          console.error('Error with token-based request:', error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    checkLoggedIn();
    
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
