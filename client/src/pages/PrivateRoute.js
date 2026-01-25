import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page

    const user = localStorage.getItem("user");
    if (!user) {
        return <Navigate to="/login" />;
    } else {
        return <Outlet />;
    }

}

// Teacher-only route protection
export const TeacherRoute = () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
        return <Navigate to="/login" />;
    }
    
    const user = JSON.parse(userStr);
    // If no code exists or code is Student001, redirect to home
    const isStudent = user && (user.code === "Student001" || !user.code);
    
    if (isStudent) {
        // Students cannot access teacher routes, redirect to home
        return <Navigate to="/" />;
    } else {
        return <Outlet />;
    }
}

export default PrivateRoute

