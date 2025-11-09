import React from 'react';
import Navber from '../Component/Navber';
import { Outlet } from 'react-router';

const MainLayOut = () => {
    return (
        <div>
            <Navber/>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayOut;