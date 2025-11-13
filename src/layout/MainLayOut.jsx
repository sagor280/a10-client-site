import React from 'react';
import Navber from '../Component/Navber';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer';
import { Toaster } from 'react-hot-toast';

const MainLayOut = () => {
    return (
        <div >
            <Navber/>
            <Outlet></Outlet>
            <Footer/>
            <Toaster/>
        </div>
    );
};

export default MainLayOut;