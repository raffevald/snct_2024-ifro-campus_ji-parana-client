import { staticOptions } from '../../../helpers/constants/staticOptions';

interface MenuItem {
    name: string;
    baseRoute: string;
    icon?: string;
    subMenu: {
        name: string;
        url: string;
        icon?: string;
    }[];
};

export const menus: MenuItem[] = [
    {
        name: "Page name",
        baseRoute: "Base route",
        subMenu: [
            { name: "Sub menu name", url: "Url do sub menu" }
        ]
    }
];
