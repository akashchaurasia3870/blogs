import React, { useContext } from 'react';
import image_ref_c from '../../../../assets/img/img1.jpg'
import { BlogDataContext } from '../../../../context/Blog_Context';

const DashBlogItem = ({ blog, openBlog }) => {

    const {theme,theme2,fontColor,fontStyle,fontWeight} = useContext(BlogDataContext);

    const formatDate = (date) => {
        // Replace with your date formatting logic
        return new Date(date).toLocaleDateString();
    };

    return (
        <div
            key={blog.id}
            className={`text-${fontColor}-600 ${fontWeight} ${fontStyle} shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg flex items-center flex-col sm:flex-row`} style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}
        >
            <img
                src={image_ref_c || "path/to/dummy-image.jpg"}
                alt={blog.title || "Dummy Title"}
                className="w-16 h-16 rounded-md mr-0 sm:mr-4 mb-4 sm:mb-0"
            />
            <div className="flex-1 text-center sm:text-left">
                <p className={`text-${fontColor}-900 font-semibold`}>
                    {blog.title || "Dummy Title"}
                </p>
                <p className={`text-${fontColor}-500 text-sm`}>
                    {blog.author || "Unknown Author"}
                </p>
                <div className={`flex items-center justify-center sm:justify-start text-sm text-${fontColor}-500`}>
                    <p className="mr-4">{formatDate(blog.date_created) || "N/A"}</p>
                    <p className="mr-4">Views: {blog.views || "0"}</p>
                    <p>Likes: {blog.likes || "0"}</p>
                </div>
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    openBlog(blog);
                }}
                className={`bg-${theme}  text-sm px-3 py-1 rounded-md hover:bg-${fontColor}-600 mt-4 sm:mt-0`}
            >
                View Blog
            </button>
        </div>
    );
};

export default DashBlogItem;
