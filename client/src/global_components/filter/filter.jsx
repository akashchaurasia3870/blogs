

import React, { useContext, useState } from 'react';
import { FaThLarge, FaThList } from 'react-icons/fa';
import { BlogDataContext } from '../../context/Blog_Context';

const Filter = ({ onSearch, onDateFilter, onSort, onLayoutChange }) => {

    let {user_data, setUserData,blog_data, setBlogData,
        authors_data, setAuthorsData,similier_data, 
        setSimilierData,trainding_data, setTrandingData,setFontStyle,setFontWeight,setTheme,setTheme2,setBackgroundImage,setFontSize,theme,theme2,fontColor,fontStyle,fontWeight}  = useContext(BlogDataContext);


    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [isGrid, setIsGrid] = useState(true); // State to manage grid layout

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        onSort(e.target.value);
    };

    const toggleGridLayout = () => {
        setIsGrid(!isGrid);
        onLayoutChange(!isGrid); // Pass the layout state to the parent
    };

    return (
        <div className={`p-2 md:p-4 my-3 md:my-4 rounded-lg flex flex-row justify-between items-center text-${fontColor}-600 ${fontWeight} ${fontStyle} w-full text-[10px] sm:text-sm md:text-md lg:text-lg`} 
        style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}
        >
            <div className="w-[40%] md:mb-0">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="flex items-center justify-end space-x-4 w-[30%]">
                <select
                    value={sortOption}
                    onChange={handleSortChange}
                    className=" p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="" disabled selected>Sort by</option>
                    <option value="title">Title</option>
                    <option value="date_created">Date</option>
                    <option value="author">Author</option>
                    <option value="likes">Likes</option>
                    <option value="views">Views</option>
                </select>

                <button
                    onClick={toggleGridLayout}
                    className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 hidden md:block"
                    title="Toggle Grid/List Layout"
                >
                    {isGrid ? <FaThList className="text-lg" /> : <FaThLarge className="text-lg" />}
                </button>
            </div>
        </div>
    );
};

export default Filter;
