import React from 'react';

import Breadcrumb from '../../components/Breadcrumb';
import { staticOptions } from '../../../helpers/constants/staticOptions';


const Dashboard: React.FC = () => {
    document.title = staticOptions.pages.home.home.title;


    return ( 
        <div className='pages'>
            <Breadcrumb steps={ staticOptions.pages.home.home.Breadcrumb } />
            <div className='pagecontainer'>
                <h1> Bem-vindo </h1>
            </div>
        </div>
    );
};

export default Dashboard;
