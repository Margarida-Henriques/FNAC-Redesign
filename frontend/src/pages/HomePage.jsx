import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import Context from '../Context';

import NavBar from '../components/layout/NavBar.jsx';
import SideBar from '../components/layout/SideBar.jsx'
import Footer from '../components/layout/Footer.jsx';
import ImageSlider from '../components/carousels/ImageSlider.jsx';
import HomeProductCard from '../components/cards/HomeProductCard.jsx';
import OneRowCarousel from '../components/carousels/OneRowCarousel.jsx';
import newsItems from '../data/newsItems.js';

import { FaRegClock, FaRegAddressCard, FaSquareYoutube, FaSquareInstagram, FaSquareFacebook, FaSquareXTwitter } from "react-icons/fa6";
import { BsTruck } from "react-icons/bs";


import promoSamsungAI from '../assets/promoSamsungAI.png'
import promoPowerDeals from '../assets/promoPowerDeals.jpg'
import promoFlashSales from '../assets/promoFlashSales.jpeg'
import valentinesSet from '../assets/valentinesSet.png'
import gridPromoSquare1 from '../assets/gridPromoSquare1.png'
import gridPromoSquare2 from '../assets/gridPromoSquare2.png'



const HomePage = () => {

    const [products, setProducts] = useState([]);
    const { deal, setDeal } = useContext(Context);
    const slides = [promoSamsungAI, promoPowerDeals, promoFlashSales];

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


    return (
        <div>
            <NavBar />
            <SideBar />
            <div className='flex flex-col justify-center w-full'>

                {/*Promo Image Slider */}
                <ImageSlider slides={slides} />

                {/* Main Content - Formating */}
                <div className='self-center mt-10 gap-2 w-11/12 sm:w-11/12 xl:w-10/12 2xl:w-9/12'>

                    {/* FNAQ Offers (Desktop) */}
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


                    {/* FNAQ Member Offers (Mobile) */}
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

                    {/* Products On Sale Section */}
                    <div ref={firstDealRef} className='block relative mt-10'>
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
                            <OneRowCarousel
                                itemsList={newsItems}
                                content={products
                                    .filter(product => product.discount)
                                    .slice(0, 10)
                                    .map((product, index) => (
                                        <HomeProductCard key={index} product={product} index={index}></HomeProductCard>
                                    ))}
                            />
                        </div>
                    </div>

                    {/* Long Promo Banner*/}
                    <div className='h-20 md:h-24 lg:h-28 text-white p-3 mt-7 sm:mt-10 bg-cover bg-center bg-no-repeat transition-transform cursor-pointer' style={{ backgroundImage: `url(${valentinesSet})` }}></div>

                    {/* News Section */}
                    <div className='flex flex-col mt-7 sm:mt-10 bg-backgroundDark p-3'>
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

                            {/* News Items */}
                            <OneRowCarousel
                                itemsList={newsItems}
                                content={newsItems.map((item, index) => (
                                    <div key={index} className='flex flex-col min-w-[310px] h-72 rounded-tr-xl rounded-bl-xl bg-white overflow-hidden shadow-md cursor-pointer'>
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
                            />

                        </div>
                    </div>
                </div>

                <Footer />

            </div>

        </div >
    )
}

export default HomePage