import React from 'react';
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/dashboard/DashboardPage.jsx';
import AdminLayout from '../layout/AdminLayout.jsx';
import EcommerceLayout from '../layout/EcommerceLayout.jsx';
import RolPage from '../pages/rol/RolPage.jsx';
import HomePage from '../pages/home/HomePage.jsx';

const AppRouter = () =>{
    return(
        <BrowserRouter>
            <Routes>
                {/* --- ZONA PÚBLICA (TIENDA) --- */}
                <Route element={<EcommerceLayout />}>
                    <Route path="/" element={<HomePage />}/>
                    <Route path="/productos" element={<h1>Catálogo de Productos</h1>} />
                </Route>
                {/* --- ZONA PRIVADA (ADMIN) --- */}
                <Route element={<AdminLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/roles" element={<RolPage />} />
                </Route>
                {/* Redirección por defecto si la ruta no existe (opcional) */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    ); 
};  
export default AppRouter;