import React from 'react'
import author_img from '../../../assets/img/img1.jpg';
import { Link } from 'react-router-dom';
function BlogAuther({ author_id }) {
    return (
        <Link to={`blogs/author/${author_id}`} className='blog_author bg1 p-2 rounded-md cursor-pointer hover:scale-[1.1] transition-all ease-in-out duration-300'>
            <div className="blog_auther_avatar">
                <img src={author_img} alt="Author" />
            </div>
            <div className="blog_author_details">
                <h5>Spider-Man</h5>
                <small>Just Now</small>
            </div>
        </Link>
    )
}

export default BlogAuther