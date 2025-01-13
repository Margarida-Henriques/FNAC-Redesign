import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { Product } from '../../../backend/models/productModel';
import logo from '../assets/logo.png'
import logoDark from '../assets/logoDark.png'
import ThemeContext from '../ThemeContext';
import { FaSun, FaMoon, FaBars, FaUser, FaCartShopping } from "react-icons/fa6";


const HomePage = () => {

    const { theme, setTheme } = useContext(ThemeContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5555/products')
            .then((response) => {
                setProducts(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [])

    return (
        <div className='h-fit py-6 w-11/12 xl:w-10/12 2xl:w-9/12 '>
            <header className='flex justify-between items-center text-black '>
                <div className='flex items-center gap-4'>
                    <img src={`${theme ? logoDark : logo}`} alt='fnac_logo' className='w-28 hover:scale-105 transition-all duration-200 cursor-pointer' />
                    <button className='flex flex-row justify-center items-center gap-2 w-32 py-2 bg-primaryYellow hover:bg-primaryYellowHover active:bg-primaryYellowActive text-white rounded transition-all cursor-pointer'>
                        <FaBars />
                        CATEGORIA
                    </button>
                </div>
                <div>
                    gdrkjg
                </div>
                <div className='flex items-center gap-2'>
                    <button
                        className='border-2 border-primaryYellow hover:border-primaryYellowHover active:v-primaryYellowActive p-2 rounded-full'
                        onClick={() => setTheme(!theme)}>
                        {theme ?
                            <FaSun className='text-lg text-black dark:text-white' />
                            :
                            <FaMoon className='text-lg text-black dark:text-white' />}
                    </button>
                    <button className='flex flex-row justify-center items-center gap-2 w-32 py-2 bg-primaryYellow hover:bg-primaryYellowHover active:bg-primaryYellowActive text-white rounded transition-all cursor-pointer'>
                        <FaUser />
                        CONTA
                    </button>
                    <button className=' flex flex-row justify-center items-center gap-2 w-32 py-2 bg-primaryYellow hover:bg-primaryYellowHover active:bg-primaryYellowActive text-white rounded transition-all cursor-pointer'>
                        <FaCartShopping className='text-lg' />
                        CESTO
                    </button>
                </div>
            </header>

        </div>
    )
}

export default HomePage