import React from 'react'
import { useTheme } from '../../context/ThemeContext';

function NewsLatter() {

    const {themeValue} = useTheme();

    return (
        <div className={`flex items-center justify-between rounded-lg text-xs md:text-lg lg:text-sm ${themeValue.bgvalue2}`}
        >
            <div className={`flex flex-col md:flex-row items-center justify-around p-6 rounded-lg text-${themeValue.fontsize} text-${themeValue.fontcolor}-500 w-full`}>
            <div className="flex flex-col items-center justify-center mb-4 md:mb-0 w-full md:w-[50%] text-center">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold ">Stay Updated!</h2>
                <p className="">Subscribe to our newsletter for the latest updates and offers.</p>
            </div>
            <div className="flex items-center justify-center w-full md:w-[50%]">
                <input type="email" placeholder="Enter your email" className="p-[7px] border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    Subscribe
                </button>
            </div>
            </div>
        </div>
    )
}

export default NewsLatter