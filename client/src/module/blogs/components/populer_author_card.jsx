import React, { useContext, useEffect, useState } from 'react';
import api_url from '../../../utils/utils';
import { IoMdAdd } from "react-icons/io";
import { Link } from 'react-router-dom'
import { BlogDataContext } from '../../../context/Blog_Context';
const PopularAuthorCard = ({ author_id }) => { 

    let { theme,theme2,fontColor,fontStyle,fontWeight ,
        }  = useContext(BlogDataContext);
    
        let [blogs_data,setBlogsData] = useState([]);
        let [author_data,setAuthorData] = useState([]);
    
        useEffect(() => {
            const fetchBlogData = async () => {
                try {
    
                    const response = await fetch(`${api_url}/blogs/author_blogs`,{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": localStorage.getItem("token"),
                        },
                        body:JSON.stringify({author_id:author_id})
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setBlogsData(data.data.blogs_data)
                        setAuthorData(data.data.user_data)
                        
                    } else {
                        console.error("Failed to fetch blog data.");
                        // localStorage.removeItem("token");
                        // navigate('/signin');
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
                className={`text-${fontColor}-600 ${fontWeight} ${fontStyle} shadow-md rounded-lg p-4 flex flex-col items-center justify-center relative bg-${theme}`}
                // style={{backgroundColor:themeGenerator()}}
                >
                <img
                    // src={api_url + author.userImage}
                    src={`${api_url+author_data?.userImage}`}
                    
                    className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                    {/* <h3 className="text-xl font-bold mb-1">{author.username}</h3> */}
                    <h3 className="text-sm md:text-xl font-bold mb-1 text-center">{author_data?.username}</h3>
                    {/* <p className="">Posts: 7</p> */}
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
