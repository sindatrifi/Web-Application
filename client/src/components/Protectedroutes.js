import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserToken = async () => {
   
    try {
      const response = await fetch('/api/protected', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        
      });
      const userId = response.headers.get('userId');
        console.log('User ID:', userId);
      if (response.ok) {
        setIsLoggedIn(true);
       
      } else {
        setIsLoggedIn(false);
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      setIsLoggedIn(false);
      navigate('/login');
    }
  }

  useEffect(() => {
    checkUserToken();
  }, []);

  return (
    <React.Fragment>
      {
        isLoggedIn ? props.children : null
      }
    </React.Fragment>
  );
}

export default ProtectedRoute;
