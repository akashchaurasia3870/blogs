import React, { useContext, useState } from 'react'
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
import CommentsPopup from './CommentsPopup';
import ShareModal from './ShareModal';

const BlogItem = ({ data }) => {
    let blog_data = data
    const { theme,theme2,fontColor,fontStyle,fontWeight } = useContext(BlogDataContext);
    const [showComments, setShowComments] = useState(false);
    let [likeCount,setLikeCount] = useState(blog_data.likes);
    let [likeStatus,setLikeStatus] = useState(false);
    let [saveStatus,setSaveStatus] = useState(false);
    let [followStatus,setFollowStatus] = useState(false);
    const [isShareModalOpen, setShareModalOpen] = useState(false);
    const postUrl = "https://example.com/post/123";

    let img_path = data.filePaths.images;
    img_path = api_url + img_path;
    const short_desc = blog_data?.content?.length > 130 ? blog_data?.content?.substr(0, 50) + "..." : blog_data?.content;
    const blog_title = blog_data?.caption?.length > 15 ? blog_data?.caption?.substr(0, 15) + "..." : blog_data?.caption;


    const toggleLike = async (blog_id) => {
        try {
          const response = await fetch(`${api_url}/blogs/toggle_like`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem("token"),
            },
            body: JSON.stringify({ blog_id }), // Pass the blog ID in the request body
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error toggling like:", errorData.message);
            return;
          }
      
          const data = await response.json();
          if(!likeStatus){
            setLikeStatus(true)
            setLikeCount(likeCount+1)
          }else{
            
            setLikeStatus(false)
            setLikeCount(likeCount-1)
          }
          return data; // Return the server's response if needed
        } catch (error) {
          console.error("Network error:", error.message);
        }
    };
    const toogleBookmark = async (blog_id) => {
        try {
          const response = await fetch(`${api_url}/blogs/toggle_bookmark`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem("token"),
            },
            body: JSON.stringify({ blog_id }), // Pass the blog ID in the request body
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error toggling bookmark:", errorData.message);
            return;
          }
      
          const data = await response.json(); // Parse the JSON response
          if(!saveStatus){
            setSaveStatus(true)
          }else{
            setSaveStatus(false)
          }
          return data; 
        } catch (error) {
          console.error("Network error:", error.message);
        }
    };
    const toogleFollow = async (blog_id) => {
        try {
          const response = await fetch(`${api_url}/blogs/toggle_follow`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem("token"),
            },
            body: JSON.stringify({ blog_id }), // Pass the blog ID in the request body
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error toggling bookmark:", errorData.message);
            return;
          }
      
          const data = await response.json(); // Parse the JSON response
          if(!saveStatus){
            setFollowStatus(true)
          }else{
            setFollowStatus(false)
          }
          return data; 
        } catch (error) {
          console.error("Network error:", error.message);
        }
    };

    return (
        <>
            <article className={`p-3 text-${fontColor}-600 ${fontWeight} ${fontStyle} rounded-[10px] w-full lg:w-3/4 lg:pr-8 flex flex-col justify-between mr-4`} 
            style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}
            >
                <Link to={`/blog/${blog_data.blog_id}`} state={{ blogData: blog_data }}>
                    <div className="h-[200px] w-full">
                        <img src={img_path} className='object-contain h-full w-full bg-gray-400 rounded-lg' />
                    </div>
                    <div className="blog_content">
                        <div className='flex justify-between items-center'>
                            <h3 className='text-sm md:text-md'>{blog_title}</h3>
                            <h3 className='flex justify-between items-center text-xs'><SlCalender className='mr-2' />{new Date(blog_data.date_created).toLocaleDateString('en-GB')}</h3>
                        </div>
                        <p className='text-sm md:text-lg lg:text-sm'>{short_desc}</p>
                    </div>
                </Link>
                {showComments && (
                        <CommentsPopup blog_id={blog_data.blog_id} onClose={() => setShowComments(false)} />
                )}
                <div className="blog_additional_info mt-4 text-xs flex flex-col space-y-2">

                    <div className="blog_hashtags mt-2">
                        {blog_data.hashtags.map((hashtag, index) => (
                            <Hashtag key={index} hashtag={hashtag} />
                        ))}
                    </div>

                    <div className="blog_actions flex justify-between items-center mt-2">
                        <div className="flex flex-row justify-between items-center w-full">
                            <div className="flex flex-col items-center justify-center" onClick={()=>{toggleLike(blog_data.blog_id)}}>
                                <button className="like-btn flex items-center justify-center">
                                    <GrLike /> <span className='ml-1'>{likeCount}</span>
                                </button>
                                <span className="text-xs"> Likes</span>
                            </div>

                            <div className="flex flex-col items-center justify-center" 
                            onClick={() => setShowComments(true)}>
                                <button className="like-btn flex items-center justify-center">
                                    <GoComment />
                                </button>
                                <span className="ml-1 text-xs">Comments</span>
                            </div>

                            <div className="flex flex-col items-center justify-center"          
                             onClick={() => setShareModalOpen(true)}
                            >
                                <button className="like-btn flex items-center justify-center">
                                    <CiShare1 />
                                </button>
                                <span className="ml-1 text-xs">Share</span>
                            </div>
                            <ShareModal
                                    isOpen={isShareModalOpen}
                                    onClose={() => setShareModalOpen(false)}
                                    postUrl={postUrl}
                                />

                            <div className="flex flex-col items-center justify-center" onClick={()=>{toogleFollow(blog_data.blog_id)}}>
                                <button className="like-btn flex items-center justify-center">
                                    <CiCirclePlus />
                                </button>
                                <span className="ml-1 text-xs">{followStatus?'Following':'Follow'}</span>
                            </div>

                            <div className="flex flex-col items-center justify-center" onClick={()=>{toogleBookmark(blog_data.blog_id)}}>
                                <button className={`like-btn flex items-center justify-center`}>
                                    <BsBookmark />
                                </button>
                                <span className="ml-1 text-xs">{saveStatus?'Saved':'Save'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
            
        </>
    );
};

export default BlogItem;
