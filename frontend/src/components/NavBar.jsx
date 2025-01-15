import React, { useEffect, useState, useContext } from 'react';
import ThemeContext from '../ThemeContext';
import logo from '../assets/logo.png'
import logoDark from '../assets/logoDark.png'
import { FaSun, FaMoon, FaBars, FaUser, FaCartShopping, FaMagnifyingGlass } from "react-icons/fa6";

const NavBar = () => {

    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <header className='flex justify-between items-center gap-4 text-black'>

            <div className='flex items-center gap-4'>
                <img src={`${theme ? logoDark : logo}`} alt='fnac_logo' className='w-28 hover:scale-105 transition-all duration-200 cursor-pointer' />
                <button className='flex flex-row justify-center items-center gap-2 w-32 py-2 bg-primaryYellow hover:bg-primaryYellowHover active:bg-primaryYellowActive text-white rounded transition-all cursor-pointer'>
                    <FaBars />
                    CATEGORIA
                </button>
            </div>

            <form action='' className='relative flex flex-row items-center w-4/12'>
                <FaMagnifyingGlass className='absolute ml-3 z-20' />
                <input
                    type="search"
                    name='search'
                    id='search'
                    placeholder='Search...'
                    autoComplete='off'
                    className='relative z-10 bg-transparent w-full p-2 rounded-full border border-gray-500 pl-9 focus:outline-none focus:ring-0 dark:bg-white ' />
            </form>

            <div className='flex items-center gap-2'>
                <button
                    className='border-2 border-primaryYellow hover:border-primaryYellowHover active:v-primaryYellowActive p-2 rounded-full'
                    onClick={() => setTheme(!theme)}>
                    {theme ?
                        <FaSun className='text-lg text-black dark:text-white' />
                        :
                        <FaMoon className='text-lg text-black dark:text-white' />}
                </button>
                <button className='flex flex-row justify-center items-center gap-2 w-32 py-2 bg-primaryYellow hover:bg-primaryYellowHover active:bg-primaryYellowActive text-white rounded transition-all cursor-pointer'>
                    <FaUser />
                    CONTA
                </button>
                <button className=' flex flex-row justify-center items-center gap-2 w-32 py-2 bg-primaryYellow hover:bg-primaryYellowHover active:bg-primaryYellowActive text-white rounded transition-all cursor-pointer'>
                    <FaCartShopping className='text-lg' />
                    CESTO
                </button>
            </div>

        </header>
    )
}

export default NavBar