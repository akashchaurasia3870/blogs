import React from 'react';
import BlogItemDetails from './blog_item_details';
import api_url from '../../../utils/utils';
import data from '../../../assets/data/data.json';
import BlogItem from './blog_item_details';
const SimiliarBlogs = () => {

    let blog_data = data.blog_data;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Similar Blogs</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {blog_data.map((blog) => (
                    <BlogItemDetails key={blog.blog_id} data={blog} />
                ))}
            </div>
        </div>
    );
};

export default SimiliarBlogs;
