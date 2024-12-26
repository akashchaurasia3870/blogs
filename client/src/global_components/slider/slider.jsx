import React, { useState, useEffect, useRef } from 'react';
import img1 from '../../assets/img/img1.jpg';
import img2 from '../../assets/img/img2.jpg';
import img3 from '../../assets/img/img1.jpg';
import img4 from '../../assets/img/img4.jpg';
import img5 from '../../assets/img/img5.jpg';
import img1 from '../../assets/img/img1.jpg';
import img1 from '../../assets/img/img1.jpg';

const Slider = ({ width = '100%', height = '100vh' }) => {
    const slides = [
        { id: 1, image: img1, title: 'Slide 1 Title', description: 'This is the description for slide 1.', bgColor: '#FF5733' },
        { id: 2, image: img2, title: 'Slide 2 Title', description: 'This is the description for slide 2.', bgColor: '#33C1FF' },
        { id: 3, image: img3, title: 'Slide 3 Title', description: 'This is the description for slide 3.', bgColor: '#8E44AD' },
        { id: 4, image: img4, title: 'Slide 4 Title', description: 'This is the description for slide 4.', bgColor: '#27AE60' },
        { id: 5, image: img5, title: 'Slide 5 Title', description: 'This is the description for slide 5.', bgColor: '#E67E22' },
        { id: 6, image: img1, title: 'Slide 6 Title', description: 'This is the description for slide 6.', bgColor: '#2980B9' },
        { id: 7, image: img1, title: 'Slide 7 Title', description: 'This is the description for slide 7.', bgColor: '#D35400' },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const slideRef = useRef();

    useEffect(() => {
        const slideInterval = setInterval(() => {
            goToNextSlide();
        }, 3000);

        return () => clearInterval(slideInterval);
    }, [currentSlide]);

    const goToPreviousSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);

        setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
        slideRef.current.style.transition = 'transform 0.5s ease-in-out';
        slideRef.current.style.transform = `translateX(-${(currentSlide === 0 ? slides.length - 1 : currentSlide - 1) * 100}%)`;

        setTimeout(() => {
            if (currentSlide === 0) {
                slideRef.current.style.transition = 'none';
                slideRef.current.style.transform = `translateX(-${(slides.length - 1) * 100}%)`;
            }
            setIsAnimating(false);
        }, 500);
    };

    const goToNextSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);

        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        slideRef.current.style.transition = 'transform 0.5s ease-in-out';
        slideRef.current.style.transform = `translateX(-${(currentSlide + 1) * 100}%)`;

        setTimeout(() => {
            if (currentSlide === slides.length - 1) {
                slideRef.current.style.transition = 'none';
                slideRef.current.style.transform = `translateX(0)`;
                setCurrentSlide(0);
            }
            setIsAnimating(false);
        }, 500);
    };

    return (
        <div className="relative overflow-hidden" style={{ width, height }}>
            <div
                ref={slideRef}
                className="absolute inset-0 flex"
                style={{ transform: `translateX(-${currentSlide * 100}%)`, transition: 'transform 0.5s ease-in-out' }}
            >
                {slides.concat(slides[0]).map((slide, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0"
                        style={{ width, height, backgroundColor: slide.bgColor }}
                    >
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
                            <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
                                {slide.title}
                            </h1>
                            <p className="text-white text-lg md:text-xl">
                                {slide.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 z-10"
                onClick={goToPreviousSlide}
                disabled={isAnimating}
            >
                &lt;
            </button>
            <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 z-10"
                onClick={goToNextSlide}
                disabled={isAnimating}
            >
                &gt;
            </button>
        </div>
    );
};

export default Slider;
