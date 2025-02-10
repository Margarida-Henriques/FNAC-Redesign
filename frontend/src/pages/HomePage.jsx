import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import Context from '../Context';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar.jsx'
import HomeProductCard from '../components/Cards/HomeProductCard.jsx';

import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import promoSamsungAI from '../assets/promoSamsungAI.jpeg'
import promoPowerDeals from '../assets/promoPowerDeals.jpeg'
import promoFlashSales from '../assets/promoFlashSales.jpeg'
import techDealsPromo from '../assets/techDealsPromo.jpg'

const HomePage = () => {

    const [products, setProducts] = useState([]);
    const { deal, setDeal } = useContext(Context);

    useEffect(() => {
        axios.get('http://localhost:5555/products?')
            .then((response) => {
                setProducts(response.data);
                console.log(response.data)

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
                <div className={`relative mt-[82px] pt-2 overflow-hidden col-span-2 w-full transition-colors duration-500`} style={{ backgroundColor: slides[currentIndex].color }}>
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
                <div className='self-center gap-4 w-11/12 sm:w-11/12 xl:w-10/12 2xl:w-9/12'>

                    <div ref={firstDealRef} className='relative p-3 mt-4 mb-3 '>

                        <div className='relative z-10 flex justify-between items-center w-full mb-3'>
                            <div className='text-3xl'>TECH DEALS</div>
                            <button>Saber mais</button>
                        </div>
                        <div className="grid h-fit grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 ">
                            {products.filter(product => product.discount).map((product, index) => (
                                <HomeProductCard key={index} product={product} index={index}></HomeProductCard>
                            ))}
                        </div>
                    </div>

                    <div className=''>
                        <div className='text-3xl font-light mt-5 mb-3'>Dia dos Namorados</div>
                        <div className="grid h-fit grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 ">
                            {products.filter(product => product.discount).map((product, index) => (
                                <HomeProductCard key={index} product={product} index={index}></HomeProductCard>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default HomePage