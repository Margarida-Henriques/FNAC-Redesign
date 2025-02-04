import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar.jsx'
import Context from '../Context';
import Slider from '../components/Slider/Slider.jsx';

import { FaRightLeft, FaHeart } from "react-icons/fa6";


const CategoryPage = () => {
    const [products, setProducts] = useState([]);
    const { categorySearched, setCategorySearched } = useContext(Context);
    const [favorites, setFavorites] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {

        axios.get('http://localhost:5555/products?', { params: { subcategory: categorySearched } })
            .then((response) => {
                setProducts(response.data);
                setFilteredProducts(response.data)
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, [categorySearched]);

    useEffect(() => {
        const filtered = products.filter(
            (product) => product.price >= priceRange.min && product.price <= priceRange.max
        );
        setFilteredProducts(filtered);
    }, [priceRange, products]);


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

                    <div className='hidden flex-col lg:flex w-[400px] bg-white dark:bg-stone-800 dark:text-white p-2 rounded-lg'>
                        <div className='text-xl border-b py-2 mb-3'>FILTER</div>
                        <div className="">Preço</div>
                        <Slider
                            min={0}
                            max={1000}
                            onChange={({ min, max }) => {
                                setPriceRange(prev =>
                                    prev.min !== min || prev.max !== max ? { min, max } : prev
                                );
                            }}
                        />
                        <div className='bg-pink-100 h-[5000px]'>fsfes</div>
                    </div>

                    <div className="grid justify-between grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 h-fit">
                        {filteredProducts.map((product, index) => (
                            <div key={index} className="relative flex flex-col h-fit bg-white dark:bg-stone-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">

                                {product.discount && (
                                    <div className="absolute top-6 right-0 bg-red-600 text-white px-3 py-1 rounded-lg font-semibold z-[9]">
                                        -{product.discount}%
                                    </div>
                                )}
                                <div className="bg-white rounded-lg p-4 flex items-center justify-center">
                                    <img
                                        src={`/productsImages/${product.img}`}
                                        alt={product.name}
                                        className="w-full h-48 object-contain hover:scale-105 transition-transform duration-300 z-[8]"
                                    />
                                </div>


                                {/* Product Details */}
                                <div className="flex-1 p-4 flex flex-col">
                                    <div className="mb-4 h-36">
                                        <div className="flex items-end gap-2 mb-2">
                                            {product.discount ? (
                                                <>
                                                    <span className="text-2xl font-bold text-red-600">
                                                        {calculateDiscountedPrice(product.price, product.discount).toFixed(2)}€
                                                    </span>
                                                    <span className="text-sm text-gray-400 line-through">
                                                        {product.price}€
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-2xl font-bold text-red-600">
                                                    {product.price}€
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-1">
                                            {product.description}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {product.type}
                                        </p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <button className="p-2 hover:text-yellow-500 transition-colors duration-200">
                                            <FaRightLeft className="text-xl" />
                                        </button>
                                        <button
                                            onClick={() => toggleFavorite(product._id)}
                                            className="p-2 transition-colors duration-200"
                                        >
                                            <FaHeart
                                                className={`text-xl ${favorites.includes(product._id)
                                                    ? 'text-red-500 hover:text-red-600'
                                                    : 'text-gray-400 hover:text-red-500'
                                                    }`}
                                            />
                                        </button>
                                    </div>
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