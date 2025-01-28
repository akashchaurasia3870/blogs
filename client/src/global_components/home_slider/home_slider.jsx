import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTheme } from '../../context/ThemeContext';
import img1 from '../../assets/img/img1.jpg'
import img2 from '../../assets/img/img2.jpg'
import img3 from '../../assets/img/img3.jpg'
import img4 from '../../assets/img/img4.jpg'
import img5 from '../../assets/img/img5.jpg'

const HomeSlider = () => {
    let {themeValue} = useTheme();
    
    const quotes = [
        { id: 1, text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
        { id: 2, text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
        { id: 3, text: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs" },
        { id: 4, text: "If life were predictable it would cease to be life, and be without flavor.", author: "Eleanor Roosevelt" },
        { id: 5, text: "If you look at what you have in life, you’ll always have more.", author: "Oprah Winfrey" },
        { id: 6, text: "Life is what happens when you’re busy making other plans.", author: "John Lennon" },
        { id: 7, text: "Don’t judge each day by the harvest you reap but by the seeds that you plant.", author: "Robert Louis Stevenson" },
        { id: 8, text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
        { id: 9, text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
        { id: 10, text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
        { id: 11, text: "Keep your face always toward the sunshine—and shadows will fall behind you.", author: "Walt Whitman" },
        { id: 12, text: "It is always the simple that produces the marvelous.", author: "Amelia Barr" },
        { id: 13, text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
        { id: 14, text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson" },
        { id: 15, text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" }
      ];
      
    // const settings = {
    //     dots: false,
    //     infinite: false,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 3000,
    //     arrows: false,
    // };

    return (
        <div className={`-mb-3 md:mb-12 mx-3 md:mx-6 rounded-lg text-${themeValue.fontcolor}-500 text-${themeValue.fontstyle} ${themeValue.bgvalue2} text-[12px] sm:text-sm md:text-md lg:text-lg`} 
        >

                    <div
                        className={`h-[30vh] sm:h-[35vh] md:h[40vh] lg:h-[50vh] rounded-lg text-[13px] sm:text-sm md:text-md lg:text-lg`}
                    >
                        <div className={`w-full h-[100%] flex flex-col justify-center items-center text-center p-3 md:p-4 bg-center bg-cover bg-no-repeat`} 
                        >
                                <h2 className="text-center font-bold mb-2 text-[16px] sm:text-xl md:text-2xl lg:text-5xl">{quotes[(Math.floor(Math.random() * 10) + 1)%10].text}</h2>
                                <p className="text-center px-4 mt-3 text-[11px] sm:text-md md:text-lg lg:text-lg">{quotes[(Math.floor(Math.random() * 10) + 1)%10].author}</p>
                        </div>
                    </div>
            {/* <Slider {...settings} className='z-0'>
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`h-[30vh] sm:h-[35vh] md:h[40vh] lg:h-[50vh] rounded-lg`}
                    >
                        <div className={`w-full h-[100%] flex justify-around items-center text-center p-3 md:p-4 bg-center bg-cover bg-no-repeat`} 
                        // style={{backgroundImage: `url(${slide.image})`}}
                        >
                                <h2 className="text-center font-bold mb-2">{slide.title}</h2>
                                <p className="text-center px-4">{slide.description}</p>
                        </div>
                    </div>
                ))}
            </Slider> */}
        </div>
    );
};



export default HomeSlider;
