
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { userIsAuthenticatedFake } from '../../services/auth';


const PrivateRoute = () => {
    return userIsAuthenticatedFake() ? <Outlet /> : <Navigate to="/login" />;
}


export default PrivateRoute