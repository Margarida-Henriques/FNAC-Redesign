import React from 'react'


const OneRowCarousel = () => {

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
            const maxScroll = 326 * (newsItems.length - 1);
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
        <div
            className='flex gap-4 transition-transform duration-300 ease-in-out'
            style={{ transform: `translateX(-${newsXAxis}px)` }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >

        </div>
    )
}

export default OneRowCarousel