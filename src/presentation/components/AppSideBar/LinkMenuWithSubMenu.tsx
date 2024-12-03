import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface LinkMenuWithSubMenuProps {
    menu: {
        name: string;
        icon?: string;
        baseRoute: string;
        subMenu: {
            name: string;
            url: string;
            icon?: string;
        }[];
    };
};

const LinkMenuWithSubMenu: React.FC<LinkMenuWithSubMenuProps> = ({ menu }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const pageUrlLocation = location.pathname;
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const toggleMenu = (menuName: string) => {
        setOpenMenu(openMenu === menuName ? null : menuName);
    };

    const handlerGoToPage = (route: string) => {
        navigate(route);
    };


    return (
        <div className="sidebarComponent_menu">
            <a
                className="sidebar-component_a display-flex justify-items-center align-items-center justify-content-space-between"
                onClick={() => toggleMenu(menu.baseRoute)}
            >
                <i className="sidebar-component_i fas fa-chart-line"></i>
                <div className=' width-100-percent '> <span> { menu.name } </span> </div>
                <i
                    className={`sidebar-component_i sidebar-component_sub-menu-icon ${
                        openMenu === menu.baseRoute ? 'fas fa-chevron-up' : 'fas fa-chevron-down'
                    }`}
                ></i>
            </a>
            {openMenu === menu.baseRoute && (
                <div className="sidebar-component_submenu">
                    { menu.subMenu.map( item => (
                        <a 
                            key={ item.url }
                            className={ `sidebar-component_a ${ pageUrlLocation === item.url ?  'sidebar-component_active' : '' }` }
                            onClick={ () => handlerGoToPage( item.url ) }
                        >
                            <i className="sidebar-component_i fas fa-plus"></i>
                            <span> { item.name } </span>
                        </a>
                    ))}
                </div>
            )}
        </div>
    )
};

export default LinkMenuWithSubMenu;
