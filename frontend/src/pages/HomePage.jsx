import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { Product } from '../../../backend/models/productModel';
import logo from '../assets/logo.png'
import ThemeContext from '../ThemeContext';

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
        <div className='h-fit py-6 w-11/12 lg:w-10/12 xl:w-9/12 '>

            <header className='flex justify-between items-center text-black bg-primaryYellow'>
                <img src={logo} alt='fnac_logo' className='w-28 hover:scale-105 transition-all duration-200 cursor-pointer' />
                <button
                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                    Toggle Theme
                </button>
            </header>

        </div>
    )
}

export default HomePage