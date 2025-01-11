import React, { useContext } from 'react';
import image_ref_c from '../../../../assets/img/img1.jpg'

const DashBlogItem = ({ blog, openBlog }) => {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    };

    return (
        <div
            key={blog.id}
            className={`text-${themeValue.fontcolor}-500 font-${themeValue.fontweight} text-${themeValue.fontstyle} shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg flex items-center flex-col sm:flex-row ${themeValue.bgvalue2}`}
        >
            <img
                src={image_ref_c || "path/to/dummy-image.jpg"}
                alt={blog.title || "Dummy Title"}
                className="w-16 h-16 rounded-md mr-0 sm:mr-4 mb-4 sm:mb-0"
            />
            <div className="flex-1 text-center sm:text-left">
                <p className={`font-semibold`}>
                    {blog.title || "Dummy Title"}
                </p>
                <p className={`text-sm`}>
                    {blog.author || "Unknown Author"}
                </p>
                <div className={`flex items-center justify-center sm:justify-start text-sm`}>
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
                className={`text-sm px-3 py-1 rounded-md mt-4 sm:mt-0`}
            >
                View Blog
            </button>
        </div>
    );
};

export default DashBlogItem;
