import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface LinkMenuProps {
    name: string
    url: string;
    icon?: string;
};


const LinkMenu: React.FC<LinkMenuProps> = ({
    url,
    name,
    icon
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const pageUrlLocation = location.pathname;

    const handlerGoToPage = (route: string) => {
        navigate(route);
    };


    return (
        <a 
            className={ `sidebar-component_a ${ pageUrlLocation === url ?  'sidebar-component_active' : '' }` }
            onClick={ () => handlerGoToPage( url ) }
        >
            { icon !== undefined ? icon : <i className="sidebar-component_i fas fa-desktop"></i> } 
            <span>{ name }</span>
        </a>
    )
};

export default LinkMenu;
