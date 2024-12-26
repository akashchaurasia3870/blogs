import React, { useContext } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BlogDataContext } from '../../context/Blog_Context';

const HomeSlider = ({ slides }) => {
    let {user_data, setUserData,blog_data, setBlogData,
        authors_data, setAuthorsData,similier_data, 
        setSimilierData,trainding_data, setTrandingData,setFontStyle,setFontWeight,setTheme,setTheme2,setBackgroundImage,setFontSize,theme,theme2,fontColor,fontStyle,fontWeight}  = useContext(BlogDataContext);


    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    function getRandomHexColor() {
        // Generate a random number between 0 and 16777215 (which is #FFFFFF in hex)
        const randomNumber = Math.floor(Math.random() * 0xFFFFFF);
        // Convert the number to a hexadecimal string and pad with leading zeros if necessary
        const hexColor = `#${randomNumber.toString(16).padStart(6, '0')}`;
        return hexColor;
    }
    


    return (
        <div className={`-mb-3 md:mb-12 mx-6 rounded-lg text-${fontColor}-600 ${fontWeight} ${fontStyle} text-[10px] sm:text-sm md:text-md lg:text-lg`} 
        style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}
        // style={{background:getRandomHexColor()}}
        >
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`h-[36vh] sm:h-[40vh] md:h[50vh] lg:h-[60vh] rounded-lg`}
                    >
                        <div className={`w-full h-full flex justify-around items-center text-center p-4 `}>
                            <div className="w-full">
                                <h2 className="text-center font-bold mb-2">{slide.title}</h2>
                                <p className="text-center">{slide.description}</p>
                            </div>
                            <div className="">

                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HomeSlider;
