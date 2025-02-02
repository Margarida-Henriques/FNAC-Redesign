import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar.jsx'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";


import promoSamsungAI from '../assets/promoSamsungAI.jpeg'
import promoPowerDeals from '../assets/promoPowerDeals.jpeg'
import promoFlashSales from '../assets/promoFlashSales.jpeg'

const HomePage = () => {

    //SlideShow
    const slides = [
        {
            img: promoSamsungAI,
            color: "#080404",
        },
        {
            img: promoPowerDeals,
            color: "#e81c2c",
        },
        {
            img: promoFlashSales,
            color: "#e00c64",
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    return (
        <div className=''>
            <NavBar />
            <SideBar />
            <div className='flex justify-center'>
                <div className='grid grid-cols-2 grid-rows-[auto] gap-4 mt-28 w-full sm:w-11/12 xl:w-10/12 2xl:w-9/12'>

                    {/* SlideShow */}
                    <div className={`relative overflow-hidden col-span-2 w-full transition-colors duration-500`} style={{ backgroundColor: slides[currentIndex].color }}>
                        <div className={`flex w-full h-full transition-transform duration-500 ease-in-out transform `} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                            {slides.map((slide, index) => (
                                <div key={index} className="flex justify-center w-full m-auto flex-shrink-0">
                                    <img src={slide.img} alt="Promo" />
                                </div>
                            ))}
                        </div>

                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl rounded-full p-2 bg-black/50 text-white cursor-pointer" onClick={prevSlide}>
                            <FaAngleLeft />
                        </div>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl rounded-full p-2 bg-black/50 text-white cursor-pointer" onClick={nextSlide}>
                            <FaAngleRight />
                        </div>
                    </div>

                    <button className='col-span-2 row-start-2 active:bg-blue-400 h-[1000px]'>hsssssssssssssssssssssssssssssssi</button>
                </div>
            </div>
        </div >
    )
}

export default HomePage