import React from 'react';
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/dashboard/DashboardPage.jsx';
import AdminLayout from '../components/AdminLayout.jsx';

const AppRouter = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<AdminLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </BrowserRouter>
    ); 
};  
export default AppRouter;