
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SimiliarBlogs from '../components/similier_blogs';
import PopularAuthors from '../components/populer_author';
import TrendingBlogs from '../components/tranding_blogs';
import { useLocation } from 'react-router-dom';
import { GrLike } from "react-icons/gr";
import { CiShare1 } from "react-icons/ci";
import { BsBookmark } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import api_url from '../../../utils/utils';
import Hashtag from '../components/hashtag';
import Silk_Slider from '../../../global_components/silk_slider/slider';
import BlogItemDetails from '../components/blog_item_details';
import data_c from '../../../assets/data/data.json'
import { BlogDataContext } from '../../../context/Blog_Context';
import BlogItem from '../components/blog_item';

function BlogDetails({ data }) {

    let { theme,theme2,fontColor,fontStyle,fontWeight ,
        authors_data, setAuthorsData,similier_data, 
        setSimilierData,trainding_data, setTrandingData}  = useContext(BlogDataContext);

    let { blog_id } = useParams();
    const location = useLocation();
    let { blogData } = location.state || {};
    let [blog, setBlog] = useState(blogData);
    let blog_data_c = data_c?.blog_data;
    let img_path = blog?.filePaths?.images;
    img_path = api_url + img_path

    useEffect(() => {
        let { blogData } = location.state || {};
        setBlog(blogData)
    }, [blog_id]);    


    if(blog==null){
        return <>Loading</>
    }
    return (
        <section className={`min-h-[80vh] py-8 bg-${theme} text-[13px] sm:text-sm md:text-md lg:text-lg`}>

            <div className={`mx-4 flex flex-col lg:flex-row text-${fontColor}-600 ${fontWeight} ${fontStyle} rounded-lg`}>
                {/* Blog Details Section */}
                {/* <div className="w-full lg:w-3/4 pr-0 lg:pr-8 flex flex-col justify-between rounded-lg mr-4" style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}>
                    <div className="flex flex-col justify-center p-2 mx-2">
                        <div className='flex justify-between items-center'>
                            <span>{blog?.caption}</span>
                            <span className='flex justify-between items-center'><SlCalender className='mr-2' />{new Date(blog?.date_created).toLocaleDateString('en-GB')}</span>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <img src={img_path} alt="Blog Thumbnail" className="max-h-[30vh] rounded-lg object-contain" />
                            <p className="mt-8 leading-relaxed">{blog?.content}</p>
                        </div>

                        <div className="blog_additional_info text-gray-600 flex flex-col space-y-4 px-6 mt-5 w-full bg-gray-300 py-2 rounded-lg">
                            <div className="flex flex-col justify-between">
                                <div className="blog_hashtags mb-2">
                                    {blog?.hashtags?.map((hashtag, index) => (
                                        <Link to={`/hashtag/${hashtag}`}>
                                            <Hashtag key={index} hashtag={hashtag} />
                                        </Link>
                                    ))}
                                </div>

                                <div className="flex items-center space-x-2 w-full">
                                    <div className="flex flex-row justify-between items-center w-full">
                                        <div className="flex flex-col items-center justify-center">
                                            <button className="like-btn flex items-center justify-center">
                                                <GrLike /> <span className='ml-1'>{blog?.likes}</span>
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

                        </div>
                    </div>
                </div> */}
                <BlogItem data={blog}/>
                {/* Trending blog Section */}
                <TrendingBlogs trainding_data={trainding_data}  />
            </div>

            <div className="mt-6 -mx-2">
                <PopularAuthors authors_id={blogData?.user_id} />
            </div>

            <div className="slider py-4 px-2">
                <Silk_Slider posts={similier_data} title={"Similier Blogs"}
                    renderSlide={(post) => <BlogItemDetails data={post} />} slidesToShow={4} />
            </div>

        </section>
    );
}

export default BlogDetails;
