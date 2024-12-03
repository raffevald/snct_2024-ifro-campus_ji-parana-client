import appRoutes from './appRoutes';
import appPagesNames from './appPagesNames';

const BASE_APP_TITLE = '(SNCT 2024) - IFRO/Campus Ji-Paraná';

export const staticOptions = {
    pages: {
        login: {
            title: `${  BASE_APP_TITLE } - Login`,
            name: 'Pagina de login',
            route: appRoutes.LOGIN
        },
        home: {
            home: {
                title: `${  BASE_APP_TITLE } - Pagina principal`,
                name: 'Pagina principal',
                route: appRoutes.Home,
                Breadcrumb: [
                    { name: appPagesNames.HOME }
                ]
            }
        },
    }
};
