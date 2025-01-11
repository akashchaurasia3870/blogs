import { useParams } from 'react-router-dom';
import Pagination from '../../../global_components/pagination/pagination';
import AuthorBio from '../components/author_bio';
import AuthorsBlogs from '../components/author_blogs';
import MoreAuthors from '../components/more_authors'
import api_url from '../../../utils/utils';
import { useEffect, useState } from 'react';
import UserBio from '../components/user_bio';
import { useTheme } from '../../../context/ThemeContext';

const AuthorDetails = () => {

    const {themeValue} = useTheme();
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
                    },
                    body:JSON.stringify({author_id}),
                    credentials: "include",
                });
                if (response.ok) {
                    const data = await response.json();
                    setBlogsData(data.writer_data.data)
                    setAuthorData(data.user_data.data)
                    
                } else {
                    console.error("Failed to fetch blog data.");
                }
            } catch (error) {
                console.error("Error fetching blog data:", error);
            }
        };

        fetchBlogData();
    }, [author_id]);

    return (
      <div className={`mx-auto p-3 md:p-6 text-${themeValue.fontsize} text-${themeValue.fontcolor}-500 ${themeValue.theme}`}>
        <UserBio author_data={author_data} />
        <AuthorsBlogs blogs_data={blogs_data} />
      </div>
    );
};
  
export default AuthorDetails