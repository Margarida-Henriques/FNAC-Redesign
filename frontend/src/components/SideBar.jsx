import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import Context from '../Context';
import logoDark from '../assets/logoDark.png'
import { FaChevronRight } from "react-icons/fa6";

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
        <div>
            {sideBar &&
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setSideBar(false)}>
                </div>
            }

            <div className={`bg-white w-72 h-full absolute top-0 left-0 shadow-lg z-50 transition-transform duration-500 ease-in-out ${sideBar ? 'transform-none' : '-translate-x-full'}`}>
                <div className='flex justify-between items-center bg-backgroundDark p-3 text-white font-semibold'>
                    <div>PRODUTOS</div>
                    <img src={logoDark} alt='fnac_logo' className='w-12 cursor-pointer' />
                </div>

                {categories.map((category) => (
                    <div className='flex justify-between items-center py-2 px-3 cursor-pointer border-b hover:bg-slate-50 transition-colors duration-100'
                        key={category._id}>
                        {category.name}
                        <FaChevronRight className='text-stone-300' />
                    </div>
                ))}

            </div>
        </div>
    )
}

export default SideBar