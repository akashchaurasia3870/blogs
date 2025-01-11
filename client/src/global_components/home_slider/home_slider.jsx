import React, { useContext } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTheme } from '../../context/ThemeContext';

const HomeSlider = ({ slides }) => {
    let {themeValue} = useTheme();

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    return (
        <div className={`-mb-3 md:mb-12 mx-3 md:mx-6 rounded-lg text-${themeValue.fontcolor}-500 text-${themeValue.fontstyle} ${themeValue.bgvalue2} text-[12px] sm:text-sm md:text-md lg:text-lg`} 
        >
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`h-[30vh] sm:h-[35vh] md:h[40vh] lg:h-[50vh] rounded-lg`}
                    >
                        <div className={`w-full h-full flex justify-around items-center text-center p-3 md:p-4 `}>
                            <div className="w-full">
                                <h2 className="text-center font-bold mb-2">{slide.title}</h2>
                                <p className="text-center px-4">{slide.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HomeSlider;
