import React, { useContext, useState } from 'react'
import '../../index.css';
import { Link, useNavigate } from 'react-router-dom';
// import { MyContext } from '../../App';
import { AiOutlineMenu } from "react-icons/ai";
import { BlogDataContext } from '../../context/Blog_Context';
import img1 from '../../assets/img/img1.jpg'
const Navbar = () => {

    let { isLogin, setIsLogin, isAdmin, setIsAdmin } = useContext(BlogDataContext)
    let [showMenu, setShowMenu] = useState(false);
    let navigate = useNavigate();

    const closeModal = () => {
        // console.log("close ", showMenu);
        setShowMenu(!showMenu);
    }

    const logoutHandler = () => {
        setIsLogin(false)
        setIsAdmin(false)
        navigate('/signin')
    }

    return (

        <div className='modalWrapper'>

            <div className="bg-green-500">
                <header className=" text-white p-4">
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex items-center">
                            <Link to="/" className='h-12 w-12 block'><img src={img1} alt="Logo" className='rounded-sm' />
                            </Link>
                        </div>

                        <div class="h-10 flex items-center justify-center pl-2">
                            <div class="relative text-left h-full">
                                <button id="dropdown-button" class="flex justify-center items-center w-full p-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none h-full" onClick={() => { setShowMenu(!showMenu) }}>
                                    <AiOutlineMenu size={20} />
                                </button>
                                <div id="dropdown-menu" class={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${showMenu == false ? 'hidden' : ''} z-10 mt-6`}>

                                    <div class="py-2 p-2 bg-red-400" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
                                        {isLogin &&
                                            <Link to='/' onClick={() => { setShowMenu(!showMenu) }}>
                                                <li className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer">Home</li>
                                            </Link>
                                        }
                                        {isLogin &&
                                            <Link to='/create_blog' onClick={() => { setShowMenu(!showMenu) }}>
                                                <li className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer">Create Blog</li>
                                            </Link>
                                        }

                                        {isLogin && isAdmin &&
                                            <Link to='/dashboard' onClick={() => { setShowMenu(!showMenu) }}>
                                                <li className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer">Dashboard</li>
                                            </Link>
                                        }

                                        {isLogin &&
                                            <Link to='/profile' onClick={() => { setShowMenu(!showMenu) }}>
                                                <li className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer">Profile</li>
                                            </Link>
                                        }

                                        {isLogin &&
                                            <Link to='/authors' onClick={() => { setShowMenu(!showMenu) }}>
                                                <li className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer">Writers</li>
                                            </Link>
                                        }

                                        {isLogin &&
                                            <Link to='/upcoming' onClick={() => { setShowMenu(!showMenu) }}>
                                                <li className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer">What's Next</li>
                                            </Link>
                                        }

                                        {isLogin &&
                                            <Link to='/about' onClick={() => { setShowMenu(!showMenu) }}>
                                                <li className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer">About</li>
                                            </Link>
                                        }
                                        {isLogin &&
                                            <Link to='/contact' onClick={() => { setShowMenu(!showMenu) }}>
                                                <li className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer">Contact</li>
                                            </Link>
                                        }

                                        {!isLogin &&
                                            <Link to='/signin' onClick={() => { setShowMenu(!showMenu) }}>
                                                <li className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer">SignIn</li>
                                            </Link>
                                        }
                                        {!isLogin &&
                                            <Link to='/signup' onClick={() => { setShowMenu(!showMenu) }}>
                                                <li className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer">SignUp</li>
                                            </Link>
                                        }
                                        {!isLogin &&
                                            <Link to='/verify' onClick={() => { setShowMenu(!showMenu) }}>
                                                <li className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer">Verify OTP</li>
                                            </Link>
                                        }
                                        {isLogin &&
                                            <Link to='/signin' onClick={() => {
                                                logoutHandler()
                                                setShowMenu(!showMenu)
                                            }}>
                                                <li className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer">SignOut</li>
                                            </Link>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

            </div>
        </div>

    );
};

export default Navbar;
