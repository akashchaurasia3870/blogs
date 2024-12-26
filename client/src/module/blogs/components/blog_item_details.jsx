import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import api_url from '../../../utils/utils';
import { GrLike } from "react-icons/gr";
import { CiShare1 } from "react-icons/ci";
import { BsBookmark } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import Hashtag from './hashtag';
import { BlogDataContext } from '../../../context/Blog_Context';

const BlogItemDetails = ({ data }) => {

    const { theme,theme2,fontColor,fontStyle,fontWeight } = useContext(BlogDataContext);
  

    let blog_data = data
    let img_path = data.filePaths.images;
    img_path = api_url + img_path;

    const short_desc = blog_data?.content?.length > 130 ? blog_data?.content?.substr(0, 50) + "..." : blog_data?.content;

    const blog_title = blog_data?.caption?.length > 15 ? blog_data?.caption?.substr(0, 15) + "..." : blog_data?.caption;

    return (
        <article className={`p-3 text-${fontColor}-600 ${fontWeight} ${fontStyle} rounded-[10px]`} 
        style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}
        >
            <Link to={`/blog/${blog_data.blog_id}`} state={{ blogData: blog_data }}>

                <div className=" h-[200px]">
                    <img src={img_path} alt="thumbnail" className='object-contain h-full w-full' />
                </div>
                <div className="blog_content">
                    <div className='flex justify-between items-center'>
                        <h3 className='text-sm md:text-md'>{blog_title}</h3>
                        <h3 className='flex justify-between items-center text-xs'><SlCalender className='mr-2' />{new Date(blog_data.date_created).toLocaleDateString('en-GB')}</h3>
                    </div>
                    <p className='text-sm md:text-lg lg:text-sm'>{short_desc}</p>
                    {/* <div className="blog_footer">
        <BlogAuther author_id={blog_data.user_id} />
        <Link to={`blogs/cat/${blog_data.user_id}`}>
            <h3 className='btn'>{blog_data?.category}</h3>
        </Link>
    </div> */}
                </div>
            </Link>

            {/* Additional Information */}
            <div className="blog_additional_info mt-4 text-xs flex flex-col space-y-2">

                {/* Hashtags */}
                <div className="blog_hashtags mt-2">
                    {blog_data.hashtags.map((hashtag, index) => (
                        // <span key={index} className="hashtag text-blue-500 mr-2">
                        //     {hashtag}
                        // </span>
                        <Hashtag key={index} hashtag={hashtag} />
                    ))}
                </div>

                <div className="blog_actions flex justify-between items-center mt-2">
                    <div className="flex flex-row justify-between items-center w-full">
                        <div className="flex flex-col items-center justify-center">
                            <button className="like-btn flex items-center justify-center">
                                <GrLike /> <span className='ml-1'>{blog_data.likes}</span>
                            </button>
                            <span className="text-xs"> Likes</span>
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            <button className="like-btn flex items-center justify-center">
                                <GoComment />
                            </button>
                            <span className="ml-1 text-xs">Comments</span>
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            <button className="like-btn flex items-center justify-center">
                                <CiShare1 />
                            </button>
                            <span className="ml-1 text-xs">Share</span>
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            <button className="like-btn flex items-center justify-center">
                                <CiCirclePlus />
                            </button>
                            <span className="ml-1 text-xs">Follow</span>
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            <button className="like-btn flex items-center justify-center">
                                <BsBookmark />
                            </button>
                            <span className="ml-1 text-xs">Save</span>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogItemDetails;
