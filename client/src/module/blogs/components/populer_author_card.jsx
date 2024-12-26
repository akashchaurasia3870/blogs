import React, { useContext } from 'react';
import api_url from '../../../utils/utils';
import { IoMdAdd } from "react-icons/io";
import { Link } from 'react-router-dom'
import { BlogDataContext } from '../../../context/Blog_Context';
const PopularAuthorCard = ({ author }) => {    

    let { theme,theme2,fontColor,fontStyle,fontWeight ,
        }  = useContext(BlogDataContext);
    

    function themeGenerator() {
        const colors = [
            '#FF0000', // Red
            '#0000FF', // Blue
            '#00FF00', // Green
            '#FFA500', // Orange
            '#800080', // Purple
            '#4B0082', // Indigo
            '#EE82EE'  // Violet
        ];

        const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
        return getRandomColor();
    }



    return (
        <Link className=''
        to={`/blogs/${author?.user_id}`}
        >

            <div
                className={`text-${fontColor}-600 ${fontWeight} ${fontStyle} shadow-md rounded-lg p-4 flex flex-col items-center relative`}
                style={{backgroundColor:themeGenerator()}}>
                <img
                    // src={api_url + author.userImage}
                    src="http://localhost:8000/data/images/54f7c469-ba65-4798-bff1-d28b8f574028.jpeg"
                    alt={author?.username ? author.username : "Author Img"}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                    {/* <h3 className="text-xl font-bold mb-1">{author.username}</h3> */}
                    <h3 className="text-xl font-bold mb-1">{author?.username ? author.username : "Monkey D luffy"}</h3>
                    {/* <p className="">Posts: 7</p> */}
                </div>
                <div className="flex items-center justify-center bg-green-500 px-2 py-1 rounded-md text-white text-xm md:text-sm lg:text-sm bottom-2 cursor-pointer">
                    <span className='mx-2'>Follow</span>
                    <span className='font-extrabold text-lg md:text-lg lg:text-xl' ><IoMdAdd /></span>
                </div>
            </div>
        </Link>
    );
};

export default PopularAuthorCard;
