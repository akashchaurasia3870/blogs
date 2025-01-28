import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img1 from '../../assets/img/img1.jpg'
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { useTheme } from '../../context/ThemeContext';
import ToggleTheme from '../toogle_theme/theme_toogle';
function Header() {

    const is_login = true;
    let nevigate = useNavigate(); 
    const {themeValue} = useTheme();
    const [isMenuOpen,setIsMenuOpen] = useState(false)

    const toggleMenu = ()=>{
        setIsMenuOpen(!isMenuOpen);
    }
    const handleLogout = () => {
        nevigate('/signin');
    }
    return (
        <nav className={`flex items-center justify-between text-${themeValue.fontsize} text-${themeValue.fontcolor}-500 ${themeValue.bgvalue2} text-[11px] sm:text-sm md:text-md lg:text-lg px-4 md:px-6`} 
        >
            <div className={``}>
                <Link to="/" className='h-12 w-12 rounded-full text-sm bg-white text-black flex items-center justify-center flex-col font-bold'>
                    {/* <img src={img1} alt="Logo" className='rounded-full' /> */}
                    <span className='mt-1'>blogs</span>
                    <span>v2</span>
                </Link>
            </div>

            {/* <div className={``}>
                {is_login && <div className="space-x-1 md:space-x-2 flex items-center justify-between">
                    <Link to="/" className={`block px-2 py-1 md:px-4 md:py-2 text-${themeValue.fontcolor}-800 hover:bg-gray-100 rounded-md duration-100 ease-in-out`}>Home</Link>
                    <Link to="/profile" className={`block px-2 py-1 md:px-4 md:py-2 text-${themeValue.fontcolor}-800 hover:bg-gray-100 rounded-md duration-100 ease-in-out`}>Account</Link>
                    <Link to="/create_blog" className={`block px-2 py-1 md:px-4 md:py-2 text-${themeValue.fontcolor}-800 hover:bg-gray-100 rounded-md duration-100 ease-in-out`}>Posts</Link>
                    <Link to="/authors" className={`block px-2 py-1 md:px-4 md:py-2 text-${themeValue.fontcolor}-800 hover:bg-gray-100 rounded-md duration-100 ease-in-out`}>Writers</Link>
                    <Link to="/dashboard" className={`block px-2 py-1 md:px-4 md:py-2 text-${themeValue.fontcolor}-800 hover:bg-gray-100 rounded-md duration-100 ease-in-out`}>Dashboard</Link>
                    <Link to="/signin" onClick={() => { handleLogout() }} className={`block px-2 py-1 md:px-4 md:py-2 text-${themeValue.fontcolor}-800 hover:bg-gray-100 rounded-md duration-100 ease-in-out`}>Logout</Link>
                    <div className={`px-2 py-1 md:px-4 md:py-2`}>
                    <ToggleTheme/>
                    </div>
                    </div>
                }

                {!is_login && <div className="space-x-4 md:space-x-12">
                    <Link to="/signup" className={`block px-2 py-1 md:px-4 md:py-2 text-${themeValue.fontcolor}-800 hover:bg-gray-100 rounded-md duration-100 ease-in-out`}>Sign Up</Link>
                    <Link to="/signin" className={`block px-2 py-1 md:px-4 md:py-2 text-${themeValue.fontcolor}-800 hover:bg-gray-100 rounded-md duration-100 ease-in-out`}>Sign In</Link>
                </div>
                }
            
            </div> */}

            <div className="px-2 flex flex-row items-center justify-center">
                <GiHamburgerMenu className="text-2xl cursor-pointer mt-2 mr-2" onClick={toggleMenu} />
                <ToggleTheme className={``}/>
            {isMenuOpen && (
                <div className="absolute top-20 right-2 z-50">
                    <div className={`overflow-hidden ${themeValue.bgvalue2} px-2 w-[16em] space-y-2 py-2 rounded-lg border-2 border-blue-500`}>

                        <div className={`py-2 mx-1 px-2 cursor-pointer rounded-lg hover:${themeValue.theme}`} onClick={toggleMenu} ><Link to="/" className={``}>Home</Link></div>

                        <div className={`py-2 mx-1 px-2 cursor-pointer rounded-lg hover:${themeValue.theme}`} onClick={toggleMenu} ><Link to="/profile" className={``}>Profile</Link></div>

                        <div className={`py-2 mx-1 px-2 cursor-pointer rounded-lg hover:${themeValue.theme}`} onClick={toggleMenu} ><Link to="/create_blog" className={``}>Create Blog</Link></div>

                        <div className={`py-2 mx-1 px-2 cursor-pointer rounded-lg hover:${themeValue.theme}`} onClick={toggleMenu} ><Link to="/authors" className={``}>Writers</Link></div>

                        <div className={`py-2 mx-1 px-2 cursor-pointer rounded-lg hover:${themeValue.theme}`} onClick={toggleMenu} ><Link to="/dashboard" className={``}>Dashboard</Link></div>

                        <div className={`py-2 mx-1 px-2 cursor-pointer rounded-lg hover:${themeValue.theme}`} onClick={toggleMenu} ><Link to="/upcoming" className={``}>What's Next</Link></div>

                        <div className={`py-2 mx-1 px-2 cursor-pointer rounded-lg hover:${themeValue.theme}`} onClick={toggleMenu} ><Link to="/signout" className={``} onClick={()=>{handleLogout()}}>SignOut</Link></div>
                    </div>
                </div>
            )}
            </div>

        </nav>

    )
}

export default Header
