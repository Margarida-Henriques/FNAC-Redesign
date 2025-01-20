import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import Context from '../Context';
import logoDark from '../assets/logoDark.png'
import { FaChevronRight, FaX } from "react-icons/fa6";

const SideBar = () => {
    const { sideBar, setSideBar } = useContext(Context);
    const [secondarySideBar, setSecondarySideBar] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);


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
            setSelectedCategory(category);
            setSecondarySideBar(true);
        }
    };

    const handleCloseSecondarySideBar = (category) => {
        setSecondarySideBar(false);
        setSideBar(false);
        setTimeout(() => {
            setSelectedCategory(null);
        }, 1000)
    }

    return (
        <div className={``}>
            {sideBar &&
                <div className="fixed w-screen inset-0 bg-black bg-opacity-50 z-20 cursor-pointer transform-none"
                    onClick={() => (handleCloseSecondarySideBar())}>
                </div>
            }
            <div className={`flex h-full absolute top-0 left-0 z-50 transition-transform duration-500 ease-in-out ${sideBar ? 'transform-none' : '-translate-x-full'}`}>

                <div className={`bg-white w-72 z-40 shadow-lg`}>
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

                <div className={`bg-white h-full w-72 z-30 shadow-lg transition-transform duration-500 ease-in-out ${secondarySideBar ? 'transform-none' : '-translate-x-full'}`}>
                    <div className='flex justify-between items-center bg-primaryYellowMedium p-3 text-white font-semibold'>
                        <div>{selectedCategory?.name}</div>
                        <button className="text-white"
                            onClick={() => setSecondarySideBar(false)}>
                            <FaX className='text-sm' />
                        </button>
                    </div>
                    <div className="p-4">
                        {/* Informações específicas da categoria */}
                        <p>{selectedCategory?.description || 'Sem descrição disponível.'}</p>
                        {/* Adicione mais detalhes aqui conforme necessário */}
                    </div>
                </div>

            </div>

        </div >
    )
}

export default SideBar