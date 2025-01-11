import React, { useContext, useEffect, useState } from 'react';
import api_url from '../../../utils/utils';
import { IoMdAdd } from "react-icons/io";
import { Link } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext';
const PopularAuthorCard = ({ author_id }) => { 

        const {themeValue} = useTheme();
        let [blogs_data,setBlogsData] = useState([]);
        let [author_data,setAuthorData] = useState([]);
    
        useEffect(() => {
            const fetchBlogData = async () => {
                try {
    
                    const response = await fetch(`${api_url}/blogs/author_blogs`,{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body:JSON.stringify({author_id:author_id}),
                        credentials: "include",
                    });
                    if (response.ok) {
                        const data = await response.json();                        
                        setBlogsData(data.writer_data.data)
                        setAuthorData(data.user_data.data)
                        
                    } else {
                        console.error("Failed to fetch blog data.");
                    }
                } catch (error) {
                    console.error("Error fetching blog data:", error);
                }
            };
    
            fetchBlogData();
        }, [author_id]);
    
    return (
        <Link className=''
        to={`/blogs/${author_id}`}
        >
            <div
                className={`text-${themeValue.fontsize} text-${themeValue.fontcolor}-500 shadow-md rounded-lg p-4 flex flex-col items-center justify-center relative ${themeValue.theme}`}
                >
                <img
                    src={`${api_url+author_data?.userImage}`}
                    
                    className="w-16 h-16 rounded-sm object-cover"
                />
                <div>
                    <h3 className="text-sm md:text-xl font-bold mb-1 text-center">{author_data?.username}</h3>
                </div>
                <div className="flex items-center justify-center bg-green-500 px-2 py-1 rounded-md text-white text-xm md:text-sm lg:text-sm bottom-2 cursor-pointer">
                    <span className='mx-2 text-sm'>Follow</span>
                    <span className='font-extrabold text-lg md:text-lg lg:text-xl' ><IoMdAdd /></span>
                </div>
            </div>
        </Link>
    );
};

export default PopularAuthorCard;
