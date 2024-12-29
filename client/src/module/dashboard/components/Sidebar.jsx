import React, { useContext, useEffect, useState } from 'react';
import { RxDashboard } from "react-icons/rx";
import { BsPostcardFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { FaQuora } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { FaHouse } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import { IoNotificationsSharp } from "react-icons/io5";
import { BlogDataContext } from '../../../context/Blog_Context';

const Sidebar = ({ onMenuItemClick }) => {

    const {theme,theme2,fontColor,fontStyle,fontWeight} = useContext(BlogDataContext);


    let [showMenu, setShowMenu] = useState(true);
    let menu_items = ['Home', 'Blogs', 'Users', 'Notifications', 'Mails','Accounts'];

    let menu_logo = {
        'Home': <FaHouse />,
        'Blogs': <BsPostcardFill />,
        'Users': <FaUsers />,
        'Notifications': <IoNotificationsSharp />,
        // 'Reports': <MdOutlineReportGmailerrorred />,
        'Mails': <IoMail />,
        'Accounts': < MdAccountCircle />,
        'Settings': <IoSettingsOutline />,
    }

    let handleMenuChange = (isShow) => {
        setShowMenu(isShow);
    }

    // useEffect(() => {

    // }, [showMenu])
    return (
        <div className={`h-screen text-${fontColor}-600 ${fontWeight} ${fontStyle} w-auto transition-all ease-in-out duration-500 relative hidden md:block`} style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}>
            <div className={`p-4 font-bold text-xl  menu_items flex justify-${showMenu?'start':'center'} items-center relative text-[1.5rem] cursor-pointer mt-2`}>

                <div className={`menu_icons flex items-center justify-center`} onClick={() => { handleMenuChange(true) }}><RxDashboard /></div>
                   <div className={`menu_title ml-5 flex ${showMenu ? 'block' : 'hidden'}`}>Dashboard</div>

                    <div className={`menu_control absolute right-3 cursor-pointer text-[1.8rem] ${showMenu ? 'block'  :'hidden'}`} onClick={() => { handleMenuChange(false) }}>
                        <MdOutlineKeyboardDoubleArrowLeft />
                    </div>
            </div>
            <ul className="mt-4">
                {menu_items.map((item) => (
                    <li key={item} className="pb-3" onClick={() => onMenuItemClick(item)}>
                        <div className={`menu_items flex justify-${showMenu?'start':'center'} items-center text-[1.2rem] p-4 mx-6 rounded-md hover:bg-black hover:text-white transition-all ease-in duration-300 cursor-pointer ${showMenu ? 'mx-12' : 'mx-4'} bg-${theme}`}>
                            <div className="menu_icons flex items-center justify-center">{menu_logo[item]}</div>
                            <div className={`menu_title ml-5 ${showMenu ? 'block' : 'hidden'}`}>{item}</div>
                        </div>
                    </li>
                ))}
            </ul>

            <div className={`p-4 font-bold menu_items flex justify-${showMenu?'start':'center'} items-center text-[1.5rem] cursor-pointer absolute bottom-0 w-full`} onClick={() => onMenuItemClick('Settings')}>
                <div className="menu_icons"><IoSettingsOutline /></div>
                <div className={`menu_title ml-5 ${showMenu ? 'block' : 'hidden'}`}>Settings</div>
            </div>
        </div>
    );

};

export default Sidebar;
