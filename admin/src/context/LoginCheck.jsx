import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { StoreContext } from './StoreContext';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useContext(StoreContext);

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;