import React from 'react';

import heroImage from '../../assets/img/img1.jpg';

const HeroSection = ({ width = '100%',
    height = '60vh',
    title = 'SpiderMan',
    description = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque, necessitatibus.',
    bgColor = '#dfdfdf'
}) => {
    return (
        <div
            className="relative flex items-center justify-center text-center bg-cover bg-center"
            style={{
                backgroundImage: `url(${heroImage})`,
                width,
                height
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10 text-white px-4 md:px-8">
                <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: bgColor }}>{title}</h1>
                <p className="text-lg md:text-2xl">{description}</p>

            </div>
        </div>
    );
};

export default HeroSection;
