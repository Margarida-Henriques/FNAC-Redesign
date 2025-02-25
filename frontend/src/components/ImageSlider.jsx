import React, { useState, useRef, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const ImageSlider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    // Next slide
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    // Previous slide
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    // Captures the starting touch position
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    // Updates the touch position
    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
        console.log(touchEndX.current)
    };

    // Detects the swipe direction
    const handleTouchEnd = () => {
        const touchDiff = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50;

        if (Math.abs(touchDiff) > minSwipeDistance) {
            if (touchDiff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    };

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         nextSlide();
    //     }, 8000);
    //     return () => clearInterval(interval);
    // }, [currentIndex]);

    return (
        <div className="relative mt-[65px] overflow-hidden w-full transition-colors duration-500">

            {/* Slide Container */}
            <div
                className="flex w-full h-full transition-transform duration-500 ease-in-out transform"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="flex justify-center w-full m-auto flex-shrink-0 pt-4 bg-black">
                        <img
                            src={slide}
                            className="object-cover w-full h-[250px]"
                            alt={`Promo ${index}`}
                            draggable="false"
                        />
                    </div>
                ))}
            </div>

            {/* Arrows - only visible on desktop */}
            <div className="hidden md:block">
                <div
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl rounded-full p-2 bg-black/50 text-white cursor-pointer"
                    onClick={prevSlide}
                >
                    <FaAngleLeft />
                </div>
                <div
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl rounded-full p-2 bg-black/50 text-white cursor-pointer"
                    onClick={nextSlide}
                >
                    <FaAngleRight />
                </div>
            </div>

            {/* Slide indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${currentIndex === index ? 'bg-white' : 'bg-white/50'}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;