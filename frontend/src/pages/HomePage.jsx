import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import Context from '../Context';

import NavBar from '../components/layout/NavBar.jsx';
import SideBar from '../components/layout/SideBar.jsx'
import ImageSlider from '../components/carousels/ImageSlider.jsx';
import HomeProductCard from '../components/cards/HomeProductCard.jsx';
import OneRowCarousel from '../components/carousels/OneRowCarousel.jsx';
import newsItems from '../data/newsItems.js';

import { FaRegClock, FaRegAddressCard, FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { BsTruck } from "react-icons/bs";

import promoSamsungAI from '../assets/promoSamsungAI.png'
import promoPowerDeals from '../assets/promoPowerDeals.jpg'
import promoFlashSales from '../assets/promoFlashSales.jpeg'
import valentinesSet from '../assets/valentinesSet.png'
import ProductCard from '../components/cards/ProductCard.jsx';




const HomePage = () => {

    const [products, setProducts] = useState([]);
    const { deal, setDeal } = useContext(Context);
    const slides = [promoSamsungAI, promoPowerDeals, promoFlashSales];

    const [newsXAxis, setNewsXAxis] = useState(0);
    const touchStartX = useRef(0);



    // Get products
    useEffect(() => {
        axios.get('http://localhost:5555/products?')
            .then((response) => {
                setProducts(response.data);

            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);


    // Scroll to deal
    const firstDealRef = useRef(null);
    useEffect(() => {
        if (deal) {
            setTimeout(() => {
                if (deal === "firstDeal") {
                    firstDealRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                else if (deal === "secondDeal") {

                }
                setDeal(null);
            }, 200);
        }
    }, [deal]);


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
        <div>
            <NavBar />
            <SideBar />
            <div className='flex flex-col justify-center w-full'>

                {/*Promo Image Slider */}
                <ImageSlider slides={slides} />

                {/* Main Content - Formating*/}
                <div className='self-center mt-10 gap-2 w-11/12 sm:w-11/12 xl:w-10/12 2xl:w-9/12'>

                    {/* FNAQ Offers (Desktop) _________________________________________________________________________________*/}

                    <div className='hidden md:flex md:h-16 gap-5 dark:text-white'>

                        <div className='relative w-full flex gap-4 items-center cursor-pointer group'>
                            <FaRegClock className='absolute min-h-12 min-w-12 p-2 bottom-5 bg-primaryYellowMedium -rotate-6 group-hover:rotate-6 transition-transform text-white' />
                            <div className='bg-white pl-6 pr-2 py-2 ml-8 w-full h-24 lg:h-fit'>
                                <p className='font-bold text-sm dark:text-black lg:text-base'>
                                    Order at FNAQ
                                </p>
                                <p className='text-gray-500 font-light text-sm lg:line-clamp-1'>
                                    Pick up for free in-store in 30 min
                                </p>
                            </div>
                        </div>

                        <div className='relative w-full flex gap-4 items-center cursor-pointer group'>
                            <FaRegAddressCard className='absolute min-h-12 min-w-12 p-2 bottom-5 bg-primaryYellowMedium rotate-2 group-hover:-rotate-6 transition-transform text-white' />
                            <div className='bg-white pl-6 pr-2 py-2 ml-8 w-full h-24 lg:h-fit'>
                                <p className='font-bold text-sm dark:text-black lg:text-base'>
                                    Join the FNAQ Membership
                                </p>
                                <p className='text-gray-500 font-light text-sm lg:line-clamp-1'>
                                    Exclusive benefits for 3 years
                                </p>
                            </div>
                        </div>

                        <div className='relative w-full flex gap-4 items-center cursor-pointer group'>
                            <BsTruck className='absolute min-h-12 min-w-12 p-2 bottom-5 bg-primaryYellowMedium rotate-6 group-hover:-rotate-6 transition-transform text-white' />
                            <div className='bg-white pl-6 pr-2 py-2 ml-8 w-full h-24 lg:h-fit'>
                                <p className='font-bold text-sm dark:text-black lg:text-base'>
                                    Free Shipping for Members
                                </p>
                                <p className='text-gray-500 font-light text-sm line-clamp-2 lg:line-clamp-1'>
                                    On purchases over €15 | Mainland Portugal except Marketplace
                                </p>
                            </div>
                        </div>
                    </div>


                    {/* FNAQ Member Offers (Mobile)*/}
                    <div className='md:hidden flex justify-around gap-4 font-light '>
                        <div className=' flex flex-col gap-1 items-center w-full -rotate-6 py-4 px-2 bg-primaryYellowMedium text-white cursor-pointer'>
                            <FaRegClock className='h-7 w-7' />
                            <p className=' text-xs text-center'>
                                Free pick up in-store in 30 min
                            </p>
                        </div>
                        <div className='flex flex-col gap-1 items-center w-full rotate-6 py-4 px-2 bg-primaryYellowMedium text-white cursor-pointer'>
                            <FaRegAddressCard className='h-7 w-7' />
                            <p className='text-xs text-center'>
                                Exclusive benefits for 3 years
                            </p>
                        </div>
                        <div className='flex flex-col gap-1 items-center w-full -rotate-6 py-4 px-2 bg-primaryYellowMedium text-white cursor-pointer'>
                            <BsTruck className='h-7 w-7 ' />
                            <p className='text-xs text-center'>
                                Free Shipping for Members
                            </p>
                        </div>
                    </div>

                    {/* Products On Sale Section _________________________________________________________________________________*/}

                    <div ref={firstDealRef} className='hidden sm:block relative mt-10'>
                        <div className='flex flex-col gap-4'>
                            {/* On Sale Banner */}
                            <div className='flex justify-between'>
                                <div className="text-xl font-semibold relative after:block after:w-1/2 after:h-1 after:bg-primaryYellowMedium after:mt-1 dark:text-white">
                                    Products On Sale!
                                </div>
                                <button
                                    className='text-center text-primaryYellowMedium border-2 border-primaryYellowMedium w-24 rounded-md cursor-pointer 
                                    hover:text-lg hover:text-white hover:bg-primaryYellowMedium transition-all duration-200'>
                                    More
                                </button>
                            </div>

                            {/* Discounted Products Content */}
                            <div className="grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-h-[calc(520px)] xl:max-h-[calc(540px)] overflow-y-hidden ">
                                {products
                                    .filter(product => product.discount)
                                    .slice(0, 10)
                                    .map((product, index) => (
                                        <ProductCard key={index} product={product} index={index}></ProductCard>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* Long Promo Banner _________________________________________________________________________________*/}

                    <div className='h-20 md:h-32 text-white p-3 mt-10 bg-cover bg-center bg-no-repeat transition-transform cursor-pointer' style={{ backgroundImage: `url(${valentinesSet})` }}></div>

                    {/* News Section _________________________________________________________________________________*/}

                    <div className='flex flex-col mt-10 bg-backgroundDark p-3'>
                        {/* News Banner */}
                        <div className='flex justify-between text-white'>
                            <div className="text-xl font-semibold relative after:block after:w-2/3 after:h-1 after:bg-primaryYellowMedium after:mt-1 dark:text-white">
                                FNAQ News!
                            </div>
                            <button
                                className='text-center text-primaryYellowMedium border-2 border-primaryYellowMedium w-24 rounded-md cursor-pointer 
                                hover:text-lg hover:text-white hover:bg-primaryYellowMedium transition-all duration-200'>
                                More
                            </button>
                        </div>

                        {/* News Content */}
                        <div className='relative flex justify-between mt-8 text-black overflow-hidden'>

                            <div className='hidden md:block'>
                                {/* Arrows */}
                                <FaAngleLeft
                                    className='absolute left-2 top-1/2 -translate-y-1/2 text-3xl rounded-full p-2 bg-black/50 text-white cursor-pointer z-10 hover:bg-black/70 transition-colors'
                                    onClick={() => setNewsXAxis((prev) => Math.max(prev - 326, 0))}
                                />
                                <FaAngleRight
                                    className='absolute right-2 top-1/2 -translate-y-1/2 text-3xl rounded-full p-2 bg-black/50 text-white cursor-pointer z-10 hover:bg-black/70 transition-colors'
                                    onClick={() => setNewsXAxis((prev) => Math.min(prev + 326, 326 * (newsItems.length - 1)))}
                                />
                            </div>

                            {/* News Items */}
                            <div
                                className='flex gap-4 transition-transform duration-300 ease-in-out'
                                style={{ transform: `translateX(-${newsXAxis}px)` }}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                            >
                                {newsItems.map((item, index) => (
                                    <div key={index} className='flex flex-col min-w-[310px] h-72 rounded-tr-xl rounded-bl-xl bg-white overflow-hidden shadow-md'>
                                        <div className='relative flex-grow bg-gray-200 overflow-hidden'>
                                            <img src={item.image} loading="lazy" alt={item.title} className="w-full h-full object-cover" />
                                            <div className='absolute top-2 left-2 bg-primaryYellowMedium text-white text-xs font-bold px-2 py-1 rounded'>
                                                {item.category}
                                            </div>
                                        </div>
                                        <div className='bg-white h-24 p-4'>
                                            <h3 className='font-bold text-base mb-1'>{item.title}</h3>
                                            <p className='text-gray-600 text-sm line-clamp-2'>{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>



                    <div className='mb-72'></div>
                </div>
            </div>

        </div >
    )
}

export default HomePage