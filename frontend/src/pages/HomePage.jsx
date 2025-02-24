import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import Context from '../Context';

import NavBar from '../components/Layout/NavBar.jsx';
import SideBar from '../components/Layout/SideBar.jsx'
import ImageSlider from '../components/ImageSlider.jsx';
import HomeProductCard from '../components/Cards/HomeProductCard.jsx';

import { FaRegClock, FaRegAddressCard } from "react-icons/fa6";
import { BsTruck } from "react-icons/bs";

import promoSamsungAI from '../assets/promoSamsungAI.png'
import promoPowerDeals from '../assets/promoPowerDeals.jpg'
import promoFlashSales from '../assets/promoFlashSales.jpeg'
import onsale from '../assets/onsale.png'
import valentinesSet from '../assets/valentinesSet.png'



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
        <div className=''>
            <NavBar />
            <SideBar />
            <div className='flex flex-col justify-center w-full'>

                {/*Promo Image Slider */}
                <ImageSlider slides={slides} />

                {/* Main Content */}
                <div className='self-center mt-8 gap-2 w-11/12 sm:w-11/12 xl:w-10/12 2xl:w-9/12'>

                    {/* FNAQ Member Offers (Desktop)*/}
                    <div className='hidden md:flex md:h-16 gap-5 dark:text-white'>
                        <div className='w-full flex gap-4 items-center border-r border-gray-400 pr-5'>
                            <FaRegClock className='min-h-9 min-w-9' />
                            <div>
                                <p className='font-bold text-sm lg:text-base'>Order at FNAQ</p>
                                <p className='text-gray-500 dark:text-white font-light text-sm line-clamp-1'>Pick up for free in-store in 30 min</p>
                            </div>
                        </div>
                        <div className='w-full flex gap-4 items-center border-r border-gray-400 pr-5'>
                            <FaRegAddressCard className='min-h-9 min-w-9' />
                            <div>
                                <p className='font-bold text-sm lg:text-base'>Join the FNAQ Membership</p>
                                <p className='text-gray-500 dark:text-white font-light text-sm line-clamp-1'>Exclusive benefits for 3 years</p>
                            </div>
                        </div>
                        <div className='w-full flex gap-4 items-center'>
                            <BsTruck className='min-h-10 min-w-10' />
                            <div>
                                <p className='font-bold text-sm lg:text-base'>Free Shipping for Members</p>
                                <p className='text-gray-500 dark:text-white font-light text-sm line-clamp-1'>On purchases over €15 | Mainland Portugal except Marketplace</p>
                            </div>
                        </div>
                    </div>


                    {/* FNAQ Member Offers (Mobile)*/}
                    <div className='md:hidden flex justify-around gap-4 dark:text-white'>
                        <div className=' flex flex-col gap-1 items-center w-full'>
                            <FaRegClock className='h-7 w-7' />
                            <p className='font-semibold text-xs text-center'>Free pick up in-store in 30 min</p>
                        </div>
                        <div className='flex flex-col gap-1 items-center w-full'>
                            <FaRegAddressCard className='h-7 w-7 ' />
                            <p className='font-semibold text-xs text-center'>Exclusive benefits for 3 years</p>
                        </div>
                        <div className='flex flex-col gap-1 items-center w-full'>
                            <BsTruck className='h-7 w-7' />
                            <p className='font-semibold text-xs text-center'>Free Shipping for Members</p>
                        </div>
                    </div>

                    {/* Products On Sale Section */}
                    <div ref={firstDealRef} className='hidden sm:block relative mt-3'>
                        <div className='flex gap-4'>
                            {/* On Sale Banner */}
                            <div className='flex flex-col justify-end min-w-[350px] text-white p-3 bg-cover bg-left bg-no-repeat' style={{ backgroundImage: `url(${onsale})` }}>
                                <div className='text-5xl ml-4 text-left font-semibold'>ON SALE</div>
                                <button className=' bg-black/50 rounded p-1 m-4 hover:bg-black/80 transition-colors duration-300'>Ver mais</button>
                            </div>
                            {/* Discounted Products */}
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

                    {/* Long Promo Banner */}
                    <div className='h-20 md:h-32 text-white p-3 mt-8 bg-cover bg-center bg-no-repeat transition-transform cursor-pointer' style={{ backgroundImage: `url(${valentinesSet})` }}></div>

                    <div className='mb-72'></div>
                </div>
            </div>

        </div >
    )
}

export default HomePage