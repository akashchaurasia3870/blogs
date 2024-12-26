import React, { useState, useEffect, useContext } from 'react';
import BlogItem from '../components/blog_item';
import api_url from "../../../utils/utils";
import BlogItemDetails from '../components/blog_item_details';
import Filter from '../../../global_components/filter/filter';
import { useNavigate } from 'react-router-dom';
import Silk_Slider from '../../../global_components/silk_slider/slider';
import { BlogDataContext } from '../../../context/Blog_Context';
import NewsLatter from '../../../global_components/newslatter/newslatter';
import Contact from '../../../global_components/contact/contact';
function ViewBlogs({handleSearch,handleSort,handleLayoutChange,blogs_data,layout}) {

    let { theme,theme2,fontColor,fontStyle,fontWeight ,
        authors_data, setAuthorsData,similier_data, 
        setSimilierData,trainding_data, setTrandingData}  = useContext(BlogDataContext);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (loading) {
        return <h2 className='center'>Loading...</h2>;
    }

    if (error) {
        return <h2 className='center'>Error: {error}</h2>;
    }

    return (
        <section className='p-3 mt-0'>
            <div className='px-3'>
            <Filter onSearch={handleSearch}
                onSort={handleSort}
                onLayoutChange={handleLayoutChange} />
            </div>
            {blogs_data.length > 0 ? (
                <>
                    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 px-3 ${
                        layout
                            ? 'lg:grid-cols-4'
                            : 'lg:grid-cols-3'
                    }`}>
                        {blogs_data.map((blog_data, index) => (
                            <BlogItemDetails data={blog_data} key={index} />
                        ))}
                    </div>
                    <div className="slider px-2">
                    <Silk_Slider posts={trainding_data} title={"Trending Blogs"}
                        renderSlide={(post) => <BlogItemDetails data={post} />} slidesToShow={4} />

                   </div>
                   <div className='px-3 pt-6'>
                     <NewsLatter />
                   </div>
                   <div className='px-3 pt-7'>
                     <Contact />
                   </div>
                </>
                
            ) : (
                <h2 className='center'>No Posts Found</h2>
            )}
        </section>
    );
}

export default ViewBlogs;
