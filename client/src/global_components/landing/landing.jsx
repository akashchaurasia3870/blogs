import React from 'react'
import Navbar from '../header/header';
import Footer from '../footer/footer'
import { Outlet } from 'react-router-dom'
import NewsLatter from '../newslatter/newslatter';
function Landing() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Landing