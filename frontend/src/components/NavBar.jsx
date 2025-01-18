import React, { useEffect, useState, useContext } from 'react';
import Context from '../Context';
import logo from '../assets/logo.png'
import logoDark from '../assets/logoDark.png'
import { FaSun, FaMoon, FaBars, FaUser, FaCartShopping, FaMagnifyingGlass } from "react-icons/fa6";

const NavBar = () => {

    const { theme, setTheme } = useContext(Context);
    const { sideBar, setSideBar } = useContext(Context);

    return (
        <header className='bg-backgroundDark px-4 py-3 flex justify-center text-white font-semibold text-lg shadow-lg'>
            <div className='flex justify-between items-center gap-4  w-11/12 xl:w-10/12 2xl:w-9/12'>

                <div className='flex items-end gap-6'>
                    <img src={logoDark} alt='fnac_logo' className='w-28 hover:scale-105 transition-all duration-200 cursor-pointer' />
                    <button
                        className='flex flex-row justify-center items-center gap-2 hover:text-primaryYellow active:text-primaryYellowMedium transition-all cursor-pointer'
                        onClick={() => setSideBar(!sideBar)}>
                        <FaBars className='text-2xl' />
                        PRODUTOS
                    </button>
                </div>

                <div className='relative flex flex-row justify-center items-center text-black gap-2 w-full'>
                    <form action='' className='flex items-center w-6/12'>
                        <FaMagnifyingGlass className='absolute ml-3 z-20' />
                        <input
                            type="search"
                            name='search'
                            id='search'
                            placeholder='Search...'
                            autoComplete='off'
                            className='relative z-10 text-base bg-white w-full p-2 rounded-full pl-9 focus:outline-none focus:ring-0 ' />
                    </form>
                    <button
                        className=' hover:border-primaryYellowHover p-2 rounded-full bg-white hover:bg-primaryYellow active:text-primaryYellowMedium transition-all'
                        onClick={() => setTheme(!theme)}>
                        <FaSun className={`absolute text-lg text-black ${theme ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ease-in-out`} />
                        <FaMoon className={`text-lg text-black ${theme ? 'opacity-0' : 'opacity-100'} opacity-100 transition-opacity duration-300 ease-in-out`} />
                    </button>
                </div>

                <div className='flex items-center gap-5'>
                    <button className='hover:text-primaryYellow active:text-primaryYellowMedium transition-all cursor-pointer text-2xl'>
                        <FaUser />
                    </button>
                    <button className='hover:text-primaryYellow active:text-primaryYellowMedium transition-all cursor-pointer text-2xl'>
                        <FaCartShopping />
                    </button>
                </div>

            </div>
        </header>

    )
}

export default NavBar