import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

const CategoryPage = () => {

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
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);


    return (
        <div className='p-4'>
            <div className='flex flex-col justify-between'>
                <h1 className='text-3xl my-8'>Products</h1>
                {loading ? (
                    <Spinner />
                ) : (
                    <ul>
                        {products.map((product, index) => (
                            <li key={product._id}>{product.name}</li>
                        ))}
                    </ul>
                )}

            </div>
        </div>
    )
}

export default CategoryPage