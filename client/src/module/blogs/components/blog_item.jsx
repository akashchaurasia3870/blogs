import React from 'react'
import { Link } from 'react-router-dom';
import api_url from '../../../utils/utils';
import { GrLike } from "react-icons/gr";
import { CiShare1 } from "react-icons/ci";
import { BsBookmark } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { SlCalender } from "react-icons/sl";

function BlogItem(data) {

    let blog_data = data.data;

    const short_desc = blog_data?.content?.length > 120 ? blog_data?.content?.substr(0, 120) + "..." : blog_data?.content;
    const blog_title = blog_data?.caption?.length > 15 ? blog_data?.caption?.substr(0, 15) + "..." : blog_data?.caption;
    const img_url = `../../../assets/img/${data.thumbnail}.jpg`;

    let img_path = blog_data.filePaths.images;
    img_path = api_url + img_path

    return (
        <article className='w-full sm:w-[40%] md:w-[30%] lg:w-[23%] m-2 bg-gray-100 rounded-xl p-2'>
            <Link to={`/blog/${blog_data.blog_id}`} state={{ blogData: blog_data }}>

                <div className="blog_thumbnail">
                    <img src={img_path} alt="thumbnail" />
                </div>
                <div className="blog_content">
                    <div className='flex justify-between items-center'>
                        <h3 className='text-sm md:text-lg lg:text-md'>{blog_title}</h3>
                        <h3 className='flex justify-between items-center text-sm md:text-lg lg:text-md'><SlCalender className='mr-2' />{new Date(blog_data.date_created).toLocaleDateString('en-GB')}</h3>
                    </div>
                    <p className='text-sm md:text-lg lg:text-sm'>{short_desc}</p>
                    
                </div>
            </Link>

            {/* Additional Information */}
            <div className="blog_additional_info mt-4 text-sm text-gray-600 flex flex-col space-y-2">

                {/* Hashtags */}
                <div className="blog_hashtags mt-2">
                    {blog_data.hashtags.map((hashtag, index) => (
                        <span key={index} className="hashtag text-blue-500 mr-2">
                            {hashtag}
                        </span>
                    ))}
                </div>

                <div className="blog_actions flex justify-between items-center mt-2">
                    <div className="flex flex-row justify-between items-center w-full">
                        <div className="flex flex-col items-center justify-center">
                            <button className="like-btn flex items-center justify-center">
                                <GrLike /> <span className='ml-1'>{blog_data.likes}</span>
                            </button>
                            <span className=""> Likes</span>
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            <button className="like-btn flex items-center justify-center">
                                <GoComment />
                            </button>
                            <span className="ml-1">Comments</span>
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            <button className="like-btn flex items-center justify-center">
                                <CiShare1 />
                            </button>
                            <span className="ml-1">Share</span>
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            <button className="like-btn flex items-center justify-center">
                                <CiCirclePlus />
                            </button>
                            <span className="ml-1">Follow</span>
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            <button className="like-btn flex items-center justify-center">
                                <BsBookmark />
                            </button>
                            <span className="ml-1">Save</span>
                        </div>
                    </div>
                </div>
            </div>
        </article>

    )
}

export default BlogItem;