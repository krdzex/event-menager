import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authHelper from './authHelper';

const BlockedRoute = () => {

    return !authHelper.isAuthentcated() ? <Outlet /> : <Navigate to="/dashboard" />
}

export default BlockedRoute