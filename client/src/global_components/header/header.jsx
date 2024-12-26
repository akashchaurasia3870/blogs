import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img1 from '../../assets/img/img1.jpg'
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { BlogDataContext } from '../../context/Blog_Context';

function Navbar() {

    const is_login = localStorage.getItem("token")==''?false:true ;    

    let nevigate = useNavigate();
    const { theme,theme2,fontColor,fontStyle,fontWeight } = useContext(BlogDataContext);
  

    const handleLogout = () => {
        localStorage.removeItem('token');
        nevigate('/signin');
    }
    return (
        <nav className={`flex items-center justify-between text-${fontColor}-600 ${fontWeight} ${fontStyle} text-[11px] sm:text-sm md:text-md lg:text-lg px-4 md:px-6`} 
        style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}
        >
            <div className='w-[20%]'>
                <Link to="/" className='h-12 w-12 block'>
                    <img src={img1} alt="Logo" className='rounded-full' />
                </Link>
            </div>

            <div className='w-[80%] lg:w-[40%]'>
                {is_login && <div className="sm:space-x-2 md:space-x-6 flex items-center justify-between">

                    <Link to="/" className={`block px-2 py-1 md:px-4 md:py-2 text-${theme}-800 hover:bg-gray-100 rounded-md duration-100 ease-in-out`}>Home</Link>
                    <Link to="/profile" className={`block px-2 py-1 md:px-4 md:py-2 text-${theme}-800 hover:bg-gray-100 rounded-md duration-100 ease-in-out`}>Account</Link>
                    <Link to="/create_blog" className={`block px-2 py-1 md:px-4 md:py-2 text-${theme}-800 hover:bg-gray-100 rounded-md duration-100 ease-in-out`}>Posts</Link>
                    <Link to="/authors" className={`block px-2 py-1 md:px-4 md:py-2 text-${theme}-800 hover:bg-gray-100 rounded-md duration-100 ease-in-out`}>Writers</Link>
                    <Link to="/signin" onClick={() => { handleLogout() }} className={`block px-2 py-1 md:px-4 md:py-2 text-${theme}-800 hover:bg-gray-100 rounded-md duration-100 ease-in-out`}>Logout</Link>
                    </div>
                }

                {!is_login && <div className="space-x-4 md:space-x-12">
                    <Link to="/signup" className={`block px-2 py-1 md:px-4 md:py-2 text-${theme}-800 hover:bg-gray-100 rounded-md duration-100 ease-in-out`}>Sign Up</Link>
                    <Link to="/signin" className={`block px-2 py-1 md:px-4 md:py-2 text-${theme}-800 hover:bg-gray-100 rounded-md duration-100 ease-in-out`}>Sign In</Link>
                </div>
                }
            </div>
            

            
        </nav>

    )
}

export default Navbar
