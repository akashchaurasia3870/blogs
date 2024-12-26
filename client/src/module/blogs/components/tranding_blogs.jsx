
import React ,{useContext} from 'react';
import data from '../../../assets/data/data.json';
import api_url from '../../../utils/utils';
import PopularAuthorCard from './populer_author_card';
import { Link } from 'react-router-dom';
import {BlogDataContext } from '../../../context/Blog_Context';


function TrendingBlogs() {

    
    let { theme,theme2,fontColor,fontStyle,fontWeight ,
        authors_data, setAuthorsData,similier_data, 
        setSimilierData,trainding_data, setTrandingData}  = useContext(BlogDataContext);
    
    let blog_data = trainding_data;


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

        // Function to get a random color from the colors array
        const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

        // Generate two random colors
        const color1 = getRandomColor();
        // const color2 = getRandomColor();

        // Return a linear gradient
        // return `linear-gradient(255deg, ${color1}, ${color2})`;
        return color1
    }    

    return (
        <aside className={`w-full mt-5 lg:mt-0 lg:w-1/4 p-4  rounded-lg shadow-lg max-h-fit`} style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}>
            <div className="trending-blogs w-full ">
                <h2 className="text-2xl font-bold mb-6">Trending Blogs</h2>
                <ul className="space-y-3">
                    {blog_data.map((blog, index) => (
                        <Link to={`/blog/${blog.blog_id}`} state={{ blogData: blog_data }} className={``}>
                            <li key={blog.id}
                                className={`flex items-center space-x-3 p-4 my-3 rounded-lg bg-${theme}`}
                                // style={{ background: themeGenerator() }}
                                >
                                <span className="text-3xl md:text-4xl">#{index + 1}</span>
                                <img
                                    src={api_url + blog.filePaths.images}
                                    className="w-16 h-16 rounded-full object-cover bg-gray-400"
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

