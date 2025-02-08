import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar.jsx'
import Context from '../Context';
import Slider from '../components/Slider/Slider.jsx';

import { FaRightLeft, FaHeart, FaCheck } from "react-icons/fa6";


const CategoryPage = () => {
    const [products, setProducts] = useState([]);
    const { categorySearched, setCategorySearched } = useContext(Context);
    const [favorites, setFavorites] = useState([]);

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [filterBrand, setFilterBrand] = useState([]);
    const [filterDiscount, setFilterDiscount] = useState(false);
    const [brandsList, setBrandsList] = useState([]);
    const [specsList, setSpecsList] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:5555/products?', { params: { subcategory: categorySearched } })
            .then((response) => {
                setProducts(response.data);
                setFilteredProducts(response.data)

                const uniqueBrands = [...new Set(response.data.map(product => product.brand).filter(value => value !== undefined))];
                setBrandsList(uniqueBrands);

                const specs = [...new Set(response.data.flatMap(product => product.specs ? Object.keys(product.specs) : []))];
                setSpecsList(specs);


            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, [categorySearched]);


    //CALCULATE DISCOUNT
    const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
        const discountAmount = originalPrice * (discountPercentage / 100);
        const finalPrice = originalPrice - discountAmount;
        return finalPrice;
    };

    //FAVORITES
    const toggleFavorite = (productId) => {
        setFavorites(prev => {
            if (prev.includes(productId)) {
                return prev.filter(id => id !== productId);
            } else {
                return [...prev, productId];
            }
        });
    };

    //FILTERS_______________________________________________________!
    useEffect(() => {

        let filtered = products;

        // Discount filter

        if (filterDiscount) {
            filtered = filtered.filter(product => product.discount !== null);
        }

        // Brand filter
        if (filterBrand.length > 0) {
            filtered = filtered.filter(product => filterBrand.includes(product.brand));
        }

        // Price filter
        filtered = filtered.filter(
            (product) => product.price >= priceRange.min && product.price <= priceRange.max
        );

        setFilteredProducts(filtered);


    }, [filterDiscount, filterBrand, priceRange, products]);

    //Filter brand
    const toggleBrand = (brand) => {
        console.log(filterBrand)
        setFilterBrand(prev => {
            if (prev.includes(brand)) {
                return prev.filter(prevBrand => prevBrand !== brand)
            } else {
                return [...prev, brand];
            }

        })
    }

    const countProductPerBrand = (brand) => {
        return products.filter(product => product.brand === brand).length;
    }

    //Filter Specs

    const makeSpecsFilter = (spec) => {
        const specificSpecList = [...new Set(products.map(product => product.specs?.[spec]).filter(value => value !== undefined))];
        return specificSpecList;
    }


    return (
        <div className=''>
            <NavBar />
            <SideBar />
            <div className='flex justify-center pb-10'>
                <div className='flex gap-4 mt-28 w-full sm:w-11/12 xl:w-10/12 2xl:w-9/12'>

                    {/* FILTERS */}
                    <div className='hidden flex-col lg:flex w-[280px] min-h-screen bg-white dark:bg-zinc-800 dark:text-neutral-300 p-2 rounded'>
                        <div className='text-xl border-b py-2 mb-3'>FILTER</div>
                        <div className="">Preço</div>

                        {/* Price */}
                        <Slider
                            min={0}
                            max={1000}
                            onChange={({ min, max }) => {
                                setPriceRange(prev =>
                                    prev.min !== min || prev.max !== max ? { min, max } : prev
                                );
                            }}
                        />

                        {/* Brand */}
                        <div className='pt-3 border-t mb-2'>Brand</div>
                        <form>
                            {brandsList.map((brand, index) => (
                                <div className='flex flex-row items-center' key={index}>
                                    <input className='peer h-4 w-4 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-600 checked:border-slate-800'
                                        type="checkbox"
                                        id={brand}
                                        name={brand}
                                        value={brand}
                                        onClick={() => { toggleBrand(brand) }}

                                    />
                                    <svg className="absolute h-4 w-4 pointer-events-none opacity-0 peer-checked:opacity-100" viewBox="0 0 20 20" fill="white" stroke="white"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                                    <label className='ml-1' htmlFor={brand}> {brand} <span className='text-gray-400 text-sm'>({countProductPerBrand(brand)})</span></label>
                                </div>
                            ))}
                        </form>

                        {/* Specs */}
                        {specsList.map(specKey => (
                            <div key={specKey}>
                                <div className='pt-3 mt-5 border-t mb-2'>{specKey.charAt(0).toUpperCase() + specKey.slice(1)}</div>
                                <form>
                                    {makeSpecsFilter(specKey).map((productSpec, index) => (
                                        <div className='flex flex-row items-center' key={index}>
                                            <input className='peer h-4 w-4 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-600 checked:border-slate-800'
                                                type="checkbox"
                                                id={productSpec}
                                                name={productSpec}
                                                value={productSpec}
                                                onClick={() => { toggleBrand(productSpec) }}

                                            />
                                            <svg className="absolute h-4 w-4 pointer-events-none opacity-0 peer-checked:opacity-100" viewBox="0 0 20 20" fill="white" stroke="white"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                                            <label className='ml-1' htmlFor={productSpec}> {productSpec} <span className='text-gray-400 text-sm'>({countProductPerBrand(productSpec)})</span></label>
                                        </div>
                                    ))}
                                </form>
                            </div>
                        )
                        )}


                        {/* Discount */}
                        <div className='pt-3 mt-5 border-t mb-2'>Related to Product</div>
                        <form>
                            <div className='flex flex-row items-center'>
                                <input className='peer h-4 w-4 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-600 checked:border-slate-800'
                                    type="checkbox"
                                    id={"discount"}
                                    name={"discount"}
                                    value={"discount"}
                                    onChange={() => (setFilterDiscount(!filterDiscount))}
                                    checked={filterDiscount}
                                />
                                <svg className="absolute h-4 w-4 pointer-events-none opacity-0 peer-checked:opacity-100" viewBox="0 0 20 20" fill="white" stroke="white"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                                <label className='ml-1' htmlFor={"discount"} >Discounts</label>
                            </div>
                            <div className='flex flex-row items-center'>
                                <input className='peer h-4 w-4 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-600 checked:border-slate-800'
                                    type="checkbox"
                                    id={"discount"}
                                    name={"discount"}
                                    value={"discount"}
                                    onChange={() => (setFilterDiscount(!filterDiscount))}
                                    checked={filterDiscount}
                                />
                                <svg className="absolute h-4 w-4 pointer-events-none opacity-0 peer-checked:opacity-100" viewBox="0 0 20 20" fill="white" stroke="white"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                                <label className='ml-1' htmlFor={"discount"} >Stock</label>
                            </div>
                        </form>
                    </div>

                    {/* PRODUCTS GRID ________________________________________________________________________________________________________________________*/}

                    <div className="grid h-fit grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 ">
                        {filteredProducts.map((product, index) => (

                            // PRODUCT CARD
                            <div key={index} className="relative flex flex-col h-fit bg-white dark:bg-zinc-800 rounded shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">

                                {/* Discount tag */}
                                {product.discount && (
                                    <div className="absolute top-6 right-0 bg-red-600 dark:bg-red-500 text-white px-3 py-1 rounded-l-full font-semibold z-[9]">
                                        -{product.discount}%
                                    </div>
                                )}

                                {/* Img */}
                                <div className="bg-white rounded p-2 m-2 flex items-center justify-center">
                                    <img alt={product.name} className="w-full h-48 object-contain hover:scale-105 transition-transform duration-300 z-[8]"
                                        src={`/productsImages/${product.img}`}
                                    />
                                </div>

                                {/* PRODUCT INFORMATION*/}
                                <div className="flex-1 p-2 flex flex-col">
                                    <div className="mb-4 h-36">

                                        {/* Price */}
                                        <div className="items-end gap-2 mb-2">
                                            {product.discount ? (
                                                <>
                                                    <span className="text-2xl mr-1 font-bold text-red-600 dark:text-red-400">
                                                        {calculateDiscountedPrice(product.price, product.discount).toFixed(2)}€
                                                    </span>
                                                    <span className="text-sm text-gray-400 line-through">
                                                        {product.price}€
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                                                    {product.price}€
                                                </span>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <h3 className="font-semibold text-gray-900 dark:text-neutral-300 mb-1">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-1">
                                            {product.description}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {product.brand}
                                        </p>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
                                        <button className="p-2 hover:text-yellow-500 transition-colors duration-200">
                                            <FaRightLeft className="text-xl" />
                                        </button>
                                        <button className="p-2 transition-colors duration-200"
                                            onClick={() => toggleFavorite(product._id)}
                                        >
                                            <FaHeart className={`text-xl ${favorites.includes(product._id)
                                                ? 'text-red-500 hover:scale-125 transition-transform'
                                                : 'text-gray-400 hover:scale-125 transition-transform'
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