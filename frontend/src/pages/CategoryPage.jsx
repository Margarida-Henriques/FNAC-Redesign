import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar.jsx'
import Context from '../Context';

const CategoryPage = () => {
    const [products, setProducts] = useState([]);
    const { categorySearched, setCategorySearched } = useContext(Context);

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

    return (
        <div className=''>
            <NavBar />
            <SideBar />
            <div className='flex justify-center pb-10'>
                <div className='grid grid-cols-4 gap-5 mt-28 w-full sm:w-11/12 xl:w-10/12 2xl:w-9/12'>
                    <h1 className='h-full text-3xl bg-white'>Products</h1>
                    <div className='grid grid-cols-4 h-full gap-5 col-span-3'>
                        {products.map((product, index) => (
                            <div className='bg-white p-3 aspect-[3/5]' key={index}>
                                <img src={`/productsImages/${product.img}`} alt={product.name} />
                                <div className='flex justify-between items-center'>

                                    {product.discount ?
                                        <>
                                            <div className="flex gap-1 items-end">
                                                <p className='text-2xl font-bold text-red-700'>{calculateDiscountedPrice(product.price, product.discount).toFixed(2)}€</p>
                                                <p className=' text-stone-400'>{product.price}€</p>
                                            </div>
                                            <div className='bg-primaryYellow text-white font-semibold rounded-lg px-1'>{product.discount}%</div>
                                        </>
                                        :
                                        <div className='text-2xl font-bold text-red-700'>{product.price}€</div>
                                    }
                                </div>
                                <div className='font-semibold'>{product.name}</div>
                                <div className='text-stone-400 text-sm'>{product.description}</div>
                                <div className='text-stone-400 text-sm'>{product.type}</div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryPage