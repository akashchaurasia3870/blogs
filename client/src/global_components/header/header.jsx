import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img1 from '../../assets/img/img1.jpg'
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { useTheme } from '../../context/ThemeContext';
import ToggleTheme from '../toogle_theme/theme_toogle';
function Navbar() {

    const is_login = true;
    let nevigate = useNavigate(); 
    const {themeValue} = useTheme();

    const handleLogout = () => {
        nevigate('/signin');
    }
    return (
        <nav className={`flex items-center justify-between text-${themeValue.fontsize} text-${themeValue.fontcolor}-500 ${themeValue.bgvalue2} text-[11px] sm:text-sm md:text-md lg:text-lg px-4 md:px-6`} 
        >
            <div className='w-[20%]'>
                <Link to="/" className='h-12 w-12 block'>
                    <img src={img1} alt="Logo" className='rounded-sm' />
                </Link>
            </div>

            <div className='w-[80%] lg:w-[40%]'>
                {is_login && <div className="space-x-1 md:space-x-2 flex items-center justify-between">

                    <Link to="/" className={`block px-2 py-1 md:px-4 md:py-2 text-${themeValue.fontcolor}-800 hover:bg-gray-100 rounded-md duration-100 ease-in-out`}>Home</Link>
                    <Link to="/profile" className={`block px-2 py-1 md:px-4 md:py-2 text-${themeValue.fontcolor}-800 hover:bg-gray-100 rounded-md duration-100 ease-in-out`}>Account</Link>
                    <Link to="/create_blog" className={`block px-2 py-1 md:px-4 md:py-2 text-${themeValue.fontcolor}-800 hover:bg-gray-100 rounded-md duration-100 ease-in-out`}>Posts</Link>
                    <Link to="/authors" className={`block px-2 py-1 md:px-4 md:py-2 text-${themeValue.fontcolor}-800 hover:bg-gray-100 rounded-md duration-100 ease-in-out`}>Writers</Link>
                    <Link to="/signin" onClick={() => { handleLogout() }} className={`block px-2 py-1 md:px-4 md:py-2 text-${themeValue.fontcolor}-800 hover:bg-gray-100 rounded-md duration-100 ease-in-out`}>Logout</Link>
                    <div className={`block px-2 py-1 md:px-4 md:py-2`}>
                    <ToggleTheme/>
                    </div>
                    </div>
                }

                {!is_login && <div className="space-x-4 md:space-x-12">
                    <Link to="/signup" className={`block px-2 py-1 md:px-4 md:py-2 text-${themeValue.fontcolor}-800 hover:bg-gray-100 rounded-md duration-100 ease-in-out`}>Sign Up</Link>
                    <Link to="/signin" className={`block px-2 py-1 md:px-4 md:py-2 text-${themeValue.fontcolor}-800 hover:bg-gray-100 rounded-md duration-100 ease-in-out`}>Sign In</Link>
                </div>
                }
            
            </div>
        </nav>

    )
}

export default Navbar
