
import React ,{useContext} from 'react';
import data from '../../../assets/data/data.json';
import api_url from '../../../utils/utils';
import { Link } from 'react-router-dom';
import {BlogDataContext } from '../../../context/Blog_Context';
import { useTheme } from '../../../context/ThemeContext';


function TrendingBlogs() {

    
    let {trainding_data}  = useContext(BlogDataContext);
    const {themeValue} = useTheme();

    let blog_data = trainding_data;   

    return (
        <aside className={`w-full mt-5 lg:mt-0 lg:w-1/4 p-4  rounded-lg shadow-lg max-h-fit ${themeValue.bgvalue2}`} 
        >
            <div className="trending-blogs w-full ">
                <h2 className="text-2xl font-bold mb-6">Trending Blogs</h2>
                <ul className="space-y-3">
                    {blog_data.map((blog, index) => (
                        <Link to={`/blog/${blog.blog_id}`} state={{ blogData: blog }} className={``}>
                            <li key={blog.id}
                                className={`flex items-center space-x-3 p-4 my-3 rounded-lg ${themeValue.theme}`}
                                >
                                <span className="text-3xl md:text-4xl">#{index + 1}</span>
                                <img
                                    src={api_url + blog.filePaths.images}
                                    className="w-16 h-16 rounded-sm object-cover bg-gray-400"
                                />
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-medium">{blog?.caption?.length > 13 ? blog?.caption?.substr(0, 13) + "..." : blog?.caption}</h3>
                                    <span className="text-sm ">{new Date(blog.date_created).toLocaleDateString('en-GB')}</span>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </aside >
    );
}

export default TrendingBlogs;

