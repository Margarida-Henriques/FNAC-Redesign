import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';

import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { Product } from '../../../backend/models/productModel';
import logo from '../assets/logo.png'
import logoDark from '../assets/logoDark.png'
import Context from '../Context';
import { FaSun, FaMoon, FaBars, FaUser, FaCartShopping, FaMagnifyingGlass, FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import SideBar from '../components/SideBar.jsx'

import promoSamsungAI from '../assets/promoSamsungAI.jpeg'
import promoPowerDeals from '../assets/promoPowerDeals.jpeg'

const HomePage = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5555/products')
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [])


    //SlideShow
    const slides = [promoSamsungAI, promoPowerDeals];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    return (
        <div className='h-fit w-full'>
            <NavBar />
            <SideBar />
            <div className='flex justify-center'>
                <div className='grid grid-cols-2 grid-rows-[auto] gap-4 mt-32 w-11/12 xl:w-10/12 2xl:w-9/12'>

                    <div className="relative overflow-hidden col-span-2 bg-black w-full h-64">
                        <div className={`flex w-full h-full transition-transform duration-500 ease-in-out transform 
                            ${currentIndex === 0 ? "translate-x-0" : "-translate-x-full"}`}>
                            {slides.map((slide, index) => (
                                <div key={index} className="flex justify-center w-full m-auto flex-shrink-0">
                                    <img src={slide} alt="Promo" />
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