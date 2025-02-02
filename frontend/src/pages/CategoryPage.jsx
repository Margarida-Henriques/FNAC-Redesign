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


    return (
        <div className=''>
            <NavBar />
            <SideBar />
            <div className='flex justify-center'>
                <div className='grid grid-cols-5 gap-3 mt-28 w-full sm:w-11/12 xl:w-10/12 2xl:w-9/12'>
                    <h1 className='h-full text-3xl bg-white'>Products</h1>
                    <ul className='h-full bg-white col-span-4'>
                        {products.map((product, index) => (
                            <li key={product._id}>{product.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CategoryPage