import React from 'react'
import Header from '../header/header';
import Footer from '../footer/footer'
import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar';
function Landing() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Landing