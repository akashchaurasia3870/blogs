import React, { useContext, useState } from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { BlogDataContext } from '../../../../context/Blog_Context';
import img1 from '../../../../assets/img/img1.jpg'
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";

const SearchSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {theme,theme2,fontColor,fontStyle,fontWeight} = useContext(BlogDataContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`flex items-center justify-between py-3 px-4`} style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}>
      <div className='w-[20%]'>
            <Link to="/" className='h-12 w-12 block'>
                <img src={img1} alt="Logo" className='rounded-full' />
            </Link>
      </div>
      <div className="relative text-slate-400 px-2">
        <GiHamburgerMenu
          className="text-2xl cursor-pointer"
          onClick={toggleMenu}
        />
        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 rounded border-2 ">
            <ul className='overflow-hidden'>
            <Link to="/" className=''><li className="px-4 py-2 cursor-pointer hover:bg-slate-50" style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}>Home</li></Link>
            <Link to="/signin" className=''><li className="px-4 py-2 cursor-pointer hover:bg-slate-50" style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}} onClick={()=>{
              localStorage.removeItem("token")
            }}>Logout</li></Link>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchSection;
