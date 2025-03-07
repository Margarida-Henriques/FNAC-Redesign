import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Context from '../../ShopContext';
import discount from '../../assets/discountSidebar.jpeg'
import logoDark from '../../assets/logoDark.png'
import { FaChevronRight, FaX, FaComputer, FaLaptop, FaComputerMouse, FaChevronLeft } from "react-icons/fa6";


const iconMap = {
    Desktop: FaComputer,
    Laptop: FaLaptop,
    Mouse: FaComputerMouse
};

const SideBar = () => {
    const navigate = useNavigate();

    const { sideBar, setSideBar, categorySearched, setCategorySearched } = useContext(Context);
    const [categories, setCategories] = useState([]);

    const [secondarySideBar, setSecondarySideBar] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [subcategories, setSubcategories] = useState([]);



    useEffect(() => {
        axios.get('http://localhost:5555/category')
            .then((response) => {
                setCategories(response.data);
                console.log(categories)
            })
            .catch((error) => {
                console.error('Failed to fetch categories:', error);
            });

    }, [])

    const handleCloseBoth = () => {
        setSecondarySideBar(false);
        setSideBar(false);
    }

    const handleCategoryClick = (category) => {
        if (category == selectedCategory && secondarySideBar) {
            setSecondarySideBar(false);
        } else {
            setSubcategories(category.subcategories.map(sub => sub.name))
            setSelectedCategory(category);
            setSecondarySideBar(true);
        }
    };

    const searchCategoryClick = async (subcategory) => {

        setCategorySearched(subcategory)
        navigate("/Category");
        handleCloseBoth();
    }


    return (
        <div>
            {/* Black background */}
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-20 cursor-pointer transform-none duration-500 
                ${sideBar ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => (handleCloseBoth())}>
            </div>

            {/* SideBar */}
            <div className={`flex h-full fixed overflow-y-auto bg-white shadow-lg top-0 left-0 z-40 transition-transform duration-500 ease-in-out dark:bg-backgroundDark dark:text-white 
                ${sideBar ? 'md:transform-none' : '-translate-x-full'} ${secondarySideBar ? '-translate-x-full' : ''}`}>

                <div className='md:w-72 w-screen'>
                    <div className='fixed md:w-72 w-screen flex justify-between items-center shadow-md bg-backgroundDark p-3 text-white font-semibold'>
                        <div>PRODUCTS</div>
                        <FaX className='md:hidden text-sm' onClick={() => { setSideBar(false) }} />
                        <img src={logoDark} alt='fnac_logo' className='w-12 hidden md:block' />
                    </div>

                    <div className='mt-12'>
                        {categories.map((category) => (
                            <div className='flex justify-between items-center py-2.5 px-3 cursor-pointer border-b hover:bg-slate-100 dark:border-stone-700 dark:hover:bg-black transition-colors duration-100'
                                key={category._id}
                                onClick={() => { handleCategoryClick(category) }}>
                                {category.name}
                                <FaChevronRight className='text-stone-300' />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* SecondSideBar */}
            <div className={`flex flex-col fixed h-full w-screen overflow-auto bg-white dark:text-white dark:bg-backgroundDark md:w-72 top-0 left-0 z-50 md:z-30 shadow-lg transition-transform duration-500 ease-in-out 
                ${!sideBar ? 'md:flex hidden -translate-x-full' : secondarySideBar ? 'md:translate-x-72 ' : 'md:-translate-x-0 translate-x-full'}`}>

                <div className='flex items-center gap-1 bg-primaryYellowMedium dark:bg-primaryYellowLight shadow-md p-3 text-white font-semibold cursor-pointer'
                    onClick={() => (setSecondarySideBar(false))}>
                    <FaChevronLeft className='text-sm text-white' />
                    <div>{selectedCategory?.name}</div>
                </div>

                <div className='flex flex-col justify-between h-full'>
                    <div className='grid grid-cols-2 gap-4 p-4'>
                        {subcategories.map((subcategory, index) => {
                            const Icon = iconMap[subcategory];
                            return (
                                <button key={index} className='flex flex-col justify-center items-center border gap-2 w-full aspect-square rounded-full hover:shadow-[inset_0px_5px_15px_-3px_rgba(0,_0,_0,_0.2)] transition-all duration-300'
                                    onClick={() => (searchCategoryClick(subcategory))}>
                                    {Icon && <Icon className="text-6xl" />}
                                    <div className=''>{subcategory}</div>
                                </button>
                            );
                        })}
                    </div>
                    <img src={discount} className='p-2'></img>
                </div>
            </div>

        </div >
    )
}

export default SideBar