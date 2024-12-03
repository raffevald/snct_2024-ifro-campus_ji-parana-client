import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../services/AuthService';

import LinkMenu from './LinkMenu';
import LinkMenuWithSubMenu from './LinkMenuWithSubMenu';

import { staticOptions } from '../../../helpers/constants/staticOptions';

// import { menus } from './MenuItem';

import imagem from '../../../assets/avatar-masculino.jpg';
import '../../../styles/components/AppSideBar.css';


const AppSideBar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        AuthService.logout();
        navigate( staticOptions.pages.login.route );
    };

    return (
        <div className="sidebar-component_container">
            <center>
                <img src={ imagem } className="sidebar-component_profile-image" alt="" />
                <h4 className="sidebar-component_h4"> Rafael Evald Silva </h4>
            </center>

            <div>
                <LinkMenu name={ staticOptions.pages.home.home.name } url={ staticOptions.pages.home.home.route } />
                {/* {menus.map( item => (
                    <LinkMenuWithSubMenu key={ item.baseRoute } menu={ item } />
                ))} */}
            
                <a onClick={ handleLogout } className="sidebar-component_a">
                    <i className="sidebar-component_i fas fa-sign-out-alt"></i>
                    <span>Sair</span>
                </a>
            </div>
        </div>
    );
};

export default AppSideBar;
