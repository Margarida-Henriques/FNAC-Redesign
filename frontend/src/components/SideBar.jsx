import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import Context from '../Context';
import logoDark from '../assets/logoDark.png'
import { FaChevronRight, FaX, FaComputer, FaLaptop } from "react-icons/fa6";


const iconMap = {
    Desktop: FaComputer,
    Laptop: FaLaptop,
};

const SideBar = () => {
    const { sideBar, setSideBar } = useContext(Context);
    const [secondarySideBar, setSecondarySideBar] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [subcategories, setSubcategories] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:5555/category')
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [])


    const handleCategoryClick = (category) => {
        if (category == selectedCategory) {
            setSecondarySideBar(false);
            setTimeout(() => {
                setSelectedCategory(null);
            }, 450)
        } else {
            setSubcategories(category.subcategories)
            setSelectedCategory(category);
            setSecondarySideBar(true);
        }
    };

    const handleCloseBoth = () => {
        setSecondarySideBar(false);
        setSideBar(false);
        setTimeout(() => {
            setSelectedCategory(null);
        }, 450)
    }

    const handleCloseSecondarySideBar = () => {
        setSecondarySideBar(false);
        setTimeout(() => {
            setSelectedCategory(null);
        }, 450)
    }

    return (
        <div className={``}>
            <div className={`fixed w-screen inset-0 bg-black bg-opacity-50 z-20 cursor-pointer transform-none duration-500 ${sideBar ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => (handleCloseBoth())}>
            </div>

            <div className={`flex h-full absolute bg-white shadow-lg top-0 left-0 z-50 transition-transform duration-500 ease-in-out ${sideBar ? 'transform-none' : '-translate-x-full'}`}>
                <div className='w-72'>
                    <div className='flex justify-between items-center bg-backgroundDark p-3 text-white font-semibold'>
                        <div>PRODUTOS</div>
                        <img src={logoDark} alt='fnac_logo' className='w-12' />
                    </div>

                    {categories.map((category) => (
                        <div className='flex justify-between items-center py-2 px-3 cursor-pointer border-b hover:bg-slate-50 transition-colors duration-100'
                            key={category._id}
                            onClick={() => { handleCategoryClick(category) }}>
                            {category.name}
                            <FaChevronRight className='text-stone-300' />
                        </div>
                    ))}
                </div>
            </div>

            <div className={`bg-white w-80 top-0 left-0 absolute h-full z-30 shadow-lg transition-transform duration-500 ease-in-out ${!sideBar ? '-translate-x-full' : secondarySideBar ? 'translate-x-72' : '-translate-x-10'}`}>
                <div className='flex justify-between items-center bg-primaryYellowMedium p-3 text-white font-semibold'>
                    <div>{selectedCategory?.name}</div>
                    <button className="text-white"
                        onClick={() => (handleCloseSecondarySideBar())}>
                        <FaX className='text-sm' />
                    </button>
                </div>

                <div className='flex flex-wrap justify-between p-3 gap-2'>{subcategories.map((subcategorie, index) => {
                    const Icon = iconMap[subcategorie];
                    return (
                        <button key={index} className='flex flex-col justify-center items-center border p-2 w-36 gap-2'>
                            <div className=''>{subcategorie}</div>
                            {Icon && <Icon className="text-6xl" />}
                        </button>
                    );
                })}
                </div>

            </div>

        </div >
    )
}

export default SideBar