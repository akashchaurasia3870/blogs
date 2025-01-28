import '../../index.css';
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import bg10 from '../../assets/img/img1.jpg'
import bg11 from '../../assets/img/img1.jpg'
import bg12 from '../../assets/img/img1.jpg'
import bg15 from '../../assets/img/img1.jpg'

const Slide = ({ bg, para, bg1 }) => (
    <div className={`${bg} flex flex-row justify-center items-center h-[35vh] md:h-[55vh] lg:h-[60vh] w-full p-2 text-center rounded-lg overflow-hidden`} >
        <div className="w-1/2 flex justify-center items-center h-2/3 md:h-4/5">
            <img src={bg1} alt="" className=' bg-cover bg-center bg-no-repeat h-full' />
        </div>
        <div className="w-1/2">
            <span className='text-black text-2xl sm:text-2xl md:text-4xl lg:text-6xl  block  poetsen-one-regular'> {para[0]} </span>
            <span className='text-black text-md sm:text-lg md:text-3xl lg:text-3=5xl mt-8 poetsen-one-regular'> {para[1]}</span>
        </div>
    </div >
);

const SliderComponent = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        adaptiveHeight: true
    };

    let [para, setPara] = useState([
        ["Welcome to Sell & Buy Mart", "Find the best deals, buy and sell with ease!"],

        ["Buy Smart, Sell Easy", "Shop smart and sell easy, all in one place!"],

        ["Shop, Sell, Smile", "Join us for unbeatable deals and a seamless experience!"],

        ["Discover Deals Daily", "Discover great deals, buy and sell effortlessly here!"]

    ])

    return (
        <div className='rounded-lg overflow-hidden  h-full w-full '>
            <Slider {...settings} >
                <Slide className='h-full w-full' bg={'gr1'} para={para[0]} bg1={bg15} />
                <Slide className='h-full w-full' bg={'gr2'} para={para[1]} bg1={bg11} />
                <Slide className='h-full w-full' bg={'gr3'} para={para[2]} bg1={bg12} />
                <Slide className='h-full w-full' bg={'gr4'} para={para[3]} bg1={bg10} />
            </Slider>
        </div>

    );
};

export default SliderComponent;
