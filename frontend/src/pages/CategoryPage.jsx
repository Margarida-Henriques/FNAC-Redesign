import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar.jsx'
import Context from '../Context';

import { FaRightLeft, FaHeart } from "react-icons/fa6";


const CategoryPage = () => {
    const [products, setProducts] = useState([]);
    const { categorySearched, setCategorySearched } = useContext(Context);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {

        axios.get('http://localhost:5555/products?', { params: { subcategory: categorySearched } })
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, [categorySearched]);

    const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
        const discountAmount = originalPrice * (discountPercentage / 100);
        const finalPrice = originalPrice - discountAmount;
        return finalPrice;
    };

    const toggleFavorite = (productId) => {
        setFavorites(prev => {
            if (prev.includes(productId)) {
                return prev.filter(id => id !== productId);
            } else {
                return [...prev, productId];
            }
        });
    };

    return (
        <div className=''>
            <NavBar />
            <SideBar />
            <div className='flex justify-center pb-10'>
                <div className='flex gap-4 mt-28 w-full sm:w-11/12 xl:w-10/12 2xl:w-9/12'>
                    <div className='hidden min-h-screen lg:flex xl:w-[22%] lg:w-[30%] text-2xl bg-white dark:bg-stone-800 dark:text-white p-2 rounded-lg'>
                        <div>FILTER</div>
                    </div>
                    <div className='grid xl:grid-cols-4 xl:w-[78%] lg:w-[70%] sm:grid-cols-3 grid-cols-2  gap-3'>
                        {products.map((product, index) => (
                            <div className='relative flex flex-col justify-between max-w-full h-fit bg-white rounded-lg dark:bg-stone-800 p-2 2xl:aspect-[55/100] xl:aspect-[60/100] lg:aspect-[60/100] cursor-pointer' key={index}>
                                <div className='mb-3'>
                                    <div className='rounded-lg p-5 bg-white'>
                                        <img className=' hover:scale-105 transition-transform duration-150' src={`/productsImages/${product.img}`} alt={product.name} />
                                    </div>
                                    <div className='flex justify-between items-center mt-3'>

                                        {product.discount ?
                                            <>
                                                <div className="flex gap-1 items-end">
                                                    <p className='text-2xl font-bold text-red-700'>{calculateDiscountedPrice(product.price, product.discount).toFixed(2)}€</p>
                                                    <p className=' text-stone-400'>{product.price}€</p>
                                                </div>
                                                <div className='absolute top-2 right-0 bg-red-700 bg-opacity-85 text-white text-xl font-semibold rounded-l-lg px-2 py-1'>{product.discount}%</div>
                                            </>
                                            :
                                            <div className='text-2xl font-bold text-red-700'>{product.price}€</div>
                                        }
                                    </div>
                                    <div className='font-semibold dark:text-white'>{product.name}</div>
                                    <div className='text-stone-400 text-sm line-clamp-2'>{product.description}</div>
                                    <div className='text-stone-400 text-sm line-clamp-2'>{product.type}</div>
                                </div>
                                <div className='flex justify-between text-xl dark:text-white'>
                                    <FaRightLeft className='cursor-pointer hover:text-primaryYellowMedium transition-colors duration-150' />
                                    <FaHeart
                                        className={`cursor-pointer transition-colors duration-150 
                                            ${favorites.includes(product._id) ? 'text-red-500 hover:text-red-600' : 'hover:text-red-500'}`}
                                        onClick={() => toggleFavorite(product._id)}
                                    />
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryPage