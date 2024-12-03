import React, { ComponentType } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import SideBar from './AppSideBar/AppSideBar';

import AuthService from '../../services/AuthService';
import { staticOptions } from '../../helpers/constants/staticOptions';

interface ProtectedRouteProps {
    component: ComponentType<any>;
}

const ProtectedRouteLayout: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
    const location = useLocation();

    return AuthService.isAuthenticated() ? (
        <div style={{ display: 'flex' }}>
            <SideBar/>
            <div style={{ flex: 1 }}>
                <Component />
            </div>
        </div>
    ) : (
        <Navigate to={ staticOptions.pages.login.route } replace state={{ from: location }} />
    );
};

export default ProtectedRouteLayout;
