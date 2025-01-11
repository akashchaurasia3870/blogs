

import React, { useContext, useState } from 'react';
import { FaThLarge, FaThList } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const Filter = ({ onSearch, onDateFilter, onSort, onLayoutChange }) => {

    const {themeValue} = useTheme();

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
        <div className={`p-2 md:p-4 my-3 md:my-4 rounded-lg flex flex-row justify-between items-center text-${themeValue.fontsize} text-${themeValue.fontcolor}-500 text-${themeValue.fontstyle} ${themeValue.bgvalue2} w-full text-[10px] sm:text-sm md:text-md lg:text-lg `} 
        >
            <div className="w-[40%] md:mb-0">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    className={`w-full p-2 border rounded-md shadow-sm focus:ring-white-300 focus:border-white-300 ${themeValue.theme}`}
                />
            </div>

            <div className="flex items-center justify-end space-x-4 w-[30%]">
                <select
                    value={sortOption}
                    onChange={handleSortChange}
                    className={`p-2 border rounded-md shadow-sm focus:ring-white-100 focus:border-white-100 ${themeValue.theme}`}
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
                    className={`p-2 border border-gray-300 rounded-md shadow-sm focus:ring-white-500 focus:border-white-500 hidden md:block ${themeValue.theme}`}
                    title="Toggle Grid/List Layout"
                >
                    {isGrid ? <FaThList className="text-lg" /> : <FaThLarge className="text-lg" />}
                </button>
            </div>
        </div>
    );
};

export default Filter;
