import React, { useState } from 'react'

import BlogItem from '../components/blog_item';
import dummy_data from '../../../assets/data/data.json';
import { useParams } from 'react-router-dom';

function AuthorBlogs() {

    let { author_id } = useParams();

    let [blogs, setBlogs] = useState(dummy_data.dummy_blogs);

    let blog_data = blogs.filter((blog) => {

        if (blog.author_id == author_id) {
            return blog;
        }
    })

    return (
        <section className='author_blogs'>
            {blog_data.length > 0 && < div className="container author_blog_container">
                {
                    blog_data.map((blog_data, index) => {
                        return (
                            <BlogItem data={blog_data} key={index} />
                        )
                    })
                }
            </div>
            }
            {blog_data.length == 0 && <h2 className='center'>No Posts Found</h2>}
        </section >
    )
}

export default AuthorBlogs