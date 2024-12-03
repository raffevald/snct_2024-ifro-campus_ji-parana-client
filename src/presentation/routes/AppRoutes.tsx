import React from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';

import ProtectedRouteLayout from '../components/ProtectedRouteLayout';

import { staticOptions } from '../../helpers/constants/staticOptions';

import Login from '../../presentation/pages/login/Login';
import Home from '../pages/home/Home';


const AppRoutes: React.FC = () => (
  <Router>
        <div className="app-container">
            <div className="content">
                <Routes>
                    <Route path={ staticOptions.pages.login.route } element={<Login />} />
                    <Route path="/" element={<Navigate to={ staticOptions.pages.login.route } replace />} />

                    <Route path={ staticOptions.pages.home.home.route } element={<ProtectedRouteLayout component={ Home } />} />
                </Routes>
            </div>
        </div>
  </Router>
);

export default AppRoutes;
