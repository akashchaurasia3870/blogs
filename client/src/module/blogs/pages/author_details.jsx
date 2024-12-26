import { useParams } from 'react-router-dom';
import Pagination from '../../../global_components/pagination/pagination';
import AuthorBio from '../components/author_bio';
import AuthorsBlogs from '../components/author_blogs';
import MoreAuthors from '../components/more_authors'
import api_url from '../../../utils/utils';
import { useContext, useEffect, useState } from 'react';
import PopularAuthors from '../components/populer_author';
import { BlogDataContext } from '../../../context/Blog_Context';
import UserBio from '../components/user_bio';

const AuthorDetails = () => {

    const { theme,theme2,fontColor,fontStyle,fontWeight } = useContext(BlogDataContext);
  
    let {author_id} = useParams();
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
      <div className={`mx-auto p-3 md:p-6 bg-${theme} text-${fontColor}-600 ${fontWeight} ${fontStyle}`}>
        {/* <AuthorBio author_data={author_data} /> */}
        <UserBio author_data={author_data} />
        <AuthorsBlogs blogs_data={blogs_data} />
        {/* <Pagination /> */}
        {/* <PopularAuthors /> */}
      </div>
    );
};
  
export default AuthorDetails