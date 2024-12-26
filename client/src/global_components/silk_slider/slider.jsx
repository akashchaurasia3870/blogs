import React, { useContext } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BlogDataContext } from '../../context/Blog_Context';

const Post_Slider = ({ posts, renderSlide, title ,slidesToShow = 10 }) => {

    let { theme,theme2,fontColor,fontStyle,fontWeight ,
        authors_data, setAuthorsData,similier_data, 
        setSimilierData,trainding_data, setTrandingData}  = useContext(BlogDataContext);
    
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };    

    return (
        <div className="mt-5" 
        >
            <h3 className={`font-bold text-${fontColor}-600 ${fontWeight} ${fontStyle}`}>{title}</h3>

            <Slider {...settings} className=''>
                {posts.map((post, index) => (
                    <div key={index} className="p-1">
                        {renderSlide(post)}
                    </div>
                ))}
            </Slider>
        </div>
    );
};


// Custom Next Arrow
const NextArrow = ({ onClick }) => (
    <div
        className="absolute -top-5 right-2 transform -translate-y-1/2 z-10 cursor-pointer"
        onClick={onClick}
    >
        <div className="bg-gray-300 text-black rounded-lg px-3 py-1 shadow-lg">
            &gt;
        </div>
    </div>
);

// Custom Prev Arrow
const PrevArrow = ({ onClick }) => (
    <div
        className="absolute -top-5 right-12 transform -translate-y-1/2 z-10 cursor-pointer"
        onClick={onClick}
    >
        <div className="bg-gray-300 text-black rounded-lg px-3 py-1 shadow-lg">
            &lt;
        </div>
    </div>
);


export default Post_Slider;
