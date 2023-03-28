import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();

    // Your authentication logic here

    const token = localStorage.getItem('token');

 

    if (!token) {
      navigate('/login');
      return null;
    }

   

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
