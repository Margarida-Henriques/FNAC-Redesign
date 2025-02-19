import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import Context from '../Context';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar.jsx'
import HomeProductCard from '../components/Cards/HomeProductCard.jsx';

import { FaAngleRight, FaAngleLeft, FaRegClock, FaRegAddressCard } from "react-icons/fa6";
import promoSamsungAI from '../assets/promoSamsungAI.jpeg'
import promoPowerDeals from '../assets/promoPowerDeals.jpeg'
import promoFlashSales from '../assets/promoFlashSales.jpeg'
import onsale from '../assets/onsale.png'

const HomePage = () => {

    const [products, setProducts] = useState([]);
    const { deal, setDeal } = useContext(Context);

    useEffect(() => {
        axios.get('http://localhost:5555/products?')
            .then((response) => {
                setProducts(response.data);

            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

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


    //Deals
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
        <div className=''>
            <NavBar />
            <SideBar />
            <div className='flex flex-col justify-center w-full'>
                {/* SlideShow */}
                <div className={`relative mt-[65px] pt-4 overflow-hidden col-span-2 w-full transition-colors duration-500`} style={{ backgroundColor: slides[currentIndex].color }}>
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





                <div className='self-center mt-8 gap-2 w-11/12 sm:w-11/12 xl:w-10/12 2xl:w-9/12'>

                    <div className='hidden md:flex h-20 gap-5 dark:text-white'>
                        <div className='w-full flex gap-4 items-center'>
                            <FaRegClock className='min-h-9 min-w-9' />
                            <div>
                                <p className='font-bold text-sm lg:text-base'>Order at FNAQ</p>
                                <p className='text-gray-500 dark:text-white font-light text-sm line-clamp-1'>Pick up for free in-store in 30 min</p>
                            </div>
                        </div>
                        <div className='w-full flex gap-4 items-center'>
                            <FaRegAddressCard className='min-h-9 min-w-9' />
                            <div>
                                <p className='font-bold text-sm lg:text-base'>Join the FNAQ Membership</p>
                                <p className='text-gray-500 dark:text-white font-light text-sm line-clamp-1'>Exclusive benefits for 3 years</p>
                            </div>
                        </div>
                        <div className='w-full flex gap-4 items-center'>
                            <FaRegClock className='min-h-9 min-w-9' />
                            <div>
                                <p className='font-bold text-sm lg:text-base'>Free Shipping for Members</p>
                                <p className='text-gray-500 dark:text-white font-light text-sm line-clamp-1'>On purchases over €15 | Mainland Portugal except Marketplace</p>
                            </div>
                        </div>
                    </div>

                    {/* On Sale */}
                    <div ref={firstDealRef} className='hidden sm:block relative mt-5 '>
                        <div className='flex gap-4'>
                            <div className='flex flex-col justify-end min-w-[350px] text-white p-3 bg-cover bg-left bg-no-repeat' style={{ backgroundImage: `url(${onsale})` }}>
                                <div className='text-5xl ml-4 text-left font-semibold'>ON SALE</div>
                                <button className=' bg-black bg-opacity-50 rounded p-1 m-4'>Ver mais</button>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-[calc(540px)] overflow-y-hidden pt-7">
                                {products
                                    .filter(product => product.discount)
                                    .slice(0, 10)
                                    .map((product, index) => (
                                        <HomeProductCard key={index} product={product} index={index}></HomeProductCard>
                                    ))}
                            </div>
                        </div>
                    </div>

                    <div className='mb-72'></div>

                    {/* <div className='mt-4'>
                        <div className='text-3xl font-light mb-3'>Dia dos Namorados</div>
                        <div className="grid h-fit grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 ">
                            {products.filter(product => product.discount).map((product, index) => (
                                <HomeProductCard key={index} product={product} index={index}></HomeProductCard>
                            ))}
                        </div>
                    </div> */}
                </div>
            </div>

        </div >
    )
}

export default HomePage