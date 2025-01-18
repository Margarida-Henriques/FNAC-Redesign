import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Context from '../Context';
import { Category } from "../../../backend/models/categoryModel";

const SideBar = () => {
    const { sideBar, setSideBar } = useContext(Context);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5555/category')
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [])


    return (
        <div className={`bg-white w-64 h-full absolute top-0 left-0 shadow-lg z-50 transition-transform duration-500 ease-in-out ${sideBar ? 'transform-none' : '-translate-x-full'}`}>
            {categories.map((category) => (
                <div key={category._id}>
                    {category.name}
                </div>
            ))}
        </div>
    )
}

export default SideBar