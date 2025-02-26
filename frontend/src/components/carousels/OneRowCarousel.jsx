import React, { useState, useRef } from 'react'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";


const OneRowCarousel = ({ itemsList, content }) => {

    const [newsXAxis, setNewsXAxis] = useState(0);
    const touchStartX = useRef(0);

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        const currentTouchX = e.touches[0].clientX;
        const movement = touchStartX.current - currentTouchX; // Difference in movement
        setNewsXAxis((prev) => {
            const newPosition = prev + movement;
            const maxScroll = 326 * (itemsList.length - 1);
            return Math.max(0, Math.min(newPosition, maxScroll)); // Keep within bounds
        });
        touchStartX.current = currentTouchX; // Update for smoother movement
    };

    const handleTouchEnd = () => {
        // Snap to nearest item after scrolling
        const itemWidth = 326;
        setNewsXAxis((prev) => Math.round(prev / itemWidth) * itemWidth);
    };

    return (
        <div className='relative flex justify-between overflow-hidden'>
            <div className='hidden md:block'>
                {/* Arrows */}
                <FaAngleLeft
                    className='absolute left-2 top-1/2 -translate-y-1/2 text-3xl rounded-full p-2 bg-black/50 text-white cursor-pointer z-10 hover:bg-black/70 transition-colors'
                    onClick={() => setNewsXAxis((prev) => Math.max(prev - 326, 0))}
                />
                <FaAngleRight
                    className='absolute right-2 top-1/2 -translate-y-1/2 text-3xl rounded-full p-2 bg-black/50 text-white cursor-pointer z-10 hover:bg-black/70 transition-colors'
                    onClick={() => setNewsXAxis((prev) => Math.min(prev + 326, 326 * (itemsList.length - 1)))}
                />
            </div>
            <div
                className='flex gap-4 transition-transform duration-300 ease-in-out'
                style={{ transform: `translateX(-${newsXAxis}px)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {content}

            </div>
        </div>
    )
}

export default OneRowCarousel