import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { ROUTE } from '../constans/route';
import { useAppSelector } from '../hooks/redux';

interface IRequireAuthProps {
    children: React.ReactNode | any
}

const RequireAuth: React.FC<IRequireAuthProps> = ({children}) => {
    const location = useLocation()
    const user = useAppSelector((state) => state.auth.user)
    
    if (!user) {
        return <Navigate to={ROUTE.LOGIN_PAGE} state={{from: location}} /> 
    }
    return children
};

export default RequireAuth;