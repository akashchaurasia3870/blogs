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

const Horizontalbar = ({ menuChange }) => {

    const {theme,theme2,fontColor,fontStyle,fontWeight} = useContext(BlogDataContext);


    let [showMenu, setShowMenu] = useState(true);
    let menu_items = ['Home', 'Blogs', 'Users', 'Notifications', 'Mails','Accounts','Settings'];

    let menu_logo = {
        'Home': <FaHouse />,
        'Blogs': <BsPostcardFill />,
        'Users': <FaUsers />,
        'Notifications': <IoNotificationsSharp />,
        // 'Reports': <MdOutlineReportGmailerrorred />,
        'Mails': <IoMail />,
        'Accounts': <IoSettingsOutline />,
        'Settings': <MdAccountCircle />,
    }

    let handleMenuChange = (isShow) => {
        setShowMenu(isShow);
    }

    // useEffect(() => {

    // }, [showMenu])
    return (
        <div className={`w-screen text-${fontColor}-600 ${fontWeight} ${fontStyle} w-auto transition-all ease-in-out duration-500 fixed bottom-0`} style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}>
            <ul className="mt-4 flex flex-row items-center justify-between">
                {menu_items.map((item) => (
                    <li key={item} className="pb-3" onClick={() => menuChange(item)}>
                        <div className={`flex flex-col justify-between items-center text-xl p-2 mx-2 rounded-md hover:bg-black hover:text-white transition-all ease-in duration-300 cursor-pointer bg-${theme}`}>
                            <div className="flex items-center justify-center">{menu_logo[item]}</div>
                            {/* <div className={`menu_title ml-5 ${showMenu ? 'block' : 'hidden'}`}>{item}</div> */}
                        </div>
                    </li>
                ))}
            </ul>

            {/* <div className={`p-4 font-bold menu_items flex justify-${showMenu?'start':'center'} items-center text-[1.5rem] cursor-pointer absolute bottom-0 w-full`} onClick={() => onMenuItemClick('Settings')}>
                <div className="menu_icons"><IoSettingsOutline /></div>
                <div className={`menu_title ml-5 ${showMenu ? 'block' : 'hidden'}`}>Settings</div>
            </div> */}
        </div>
    );

};

export default Horizontalbar;
