import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';

import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { Product } from '../../../backend/models/productModel';
import logo from '../assets/logo.png'
import logoDark from '../assets/logoDark.png'
import ThemeContext from '../ThemeContext';
import { FaSun, FaMoon, FaBars, FaUser, FaCartShopping, FaMagnifyingGlass } from "react-icons/fa6";


const HomePage = () => {


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
        <div className='h-fit py-6 w-11/12 xl:w-10/12 2xl:w-9/12'>
            <NavBar />
        </div>
    )
}

export default HomePage