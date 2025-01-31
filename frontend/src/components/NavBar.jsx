import React, { useEffect, useState, useContext } from 'react';
import Context from '../Context';
import { Link } from 'react-router-dom';
import lego from '../assets/lego.png'
import fnacRestart from '../assets/fnacRestart.png'
import NTF from '../assets/NTF.png'
import logoDark from '../assets/logoDark.png'
import { FaSun, FaMoon, FaBars, FaUser, FaCartShopping, FaMagnifyingGlass, FaBullhorn, FaPuzzlePiece } from "react-icons/fa6";

const NavBar = () => {

    const { theme, setTheme } = useContext(Context);
    const { sideBar, setSideBar } = useContext(Context);
    const [showSecondaryNav, setShowSecondaryNav] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                //down
                setShowSecondaryNav(false);
            } else {
                //up
                setShowSecondaryNav(true);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    // w-11/12 xl:w-10/12 2xl:w-9/12

    return (
        <header className=''>
            {/* PrimaryNav */}
            <div className='fixed w-full h-14 md:h-16 flex justify-center items-center flex-col gap-4 bg-backgroundDark text-white font-semibold text-lg shadow-lg z-20'>
                <div className='flex justify-between w-11/12 xl:w-10/12 2xl:w-9/12'>

                    <div className='flex items-center gap-6'>
                        <Link to={"/"}><img src={logoDark} alt='fnac_logo' className='hidden md:block w-24 hover:scale-105 transition-all duration-200 cursor-pointer' /></Link>
                        <button
                            className='flex flex-row justify-center items-center gap-2 hover:text-primaryYellow active:text-primaryYellowMedium transition-all cursor-pointer'
                            onClick={() => setSideBar(!sideBar)}>
                            <FaBars className='text-2xl' />
                            <div className='hidden md:block'>PRODUCTS</div>
                        </button>
                    </div>

                    <div className='hidden relative md:flex flex-row justify-center items-center text-black gap-2 w-2/5'>
                        <form action='' className='flex items-center w-full'>
                            <FaMagnifyingGlass className='absolute ml-3 z-20' />
                            <input
                                type="search"
                                name='search'
                                id='search'
                                placeholder='Search...'
                                autoComplete='off'
                                className='relative z-10 text-base bg-white w-full p-1.5 rounded-full pl-9 focus:outline-none focus:ring-0 ' />
                        </form>
                        <button
                            className=' hover:border-primaryYellowHover p-1.5 rounded-full bg-white hover:bg-primaryYellow active:text-primaryYellowMedium transition-all'
                            onClick={() => setTheme(!theme)}>
                            <FaSun className={`absolute text-lg text-black ${theme ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ease-in-out`} />
                            <FaMoon className={`text-lg text-black ${theme ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ease-in-out`} />
                        </button>
                    </div>

                    <div className='flex items-center gap-5 '>
                        <button
                            className='md:hidden hover:border-primaryYellowHover p-1.5 rounded-full bg-white hover:bg-primaryYellow active:text-primaryYellowMedium transition-all'
                            onClick={() => setTheme(!theme)}>
                            <FaSun className={`absolute text-lg text-black ${theme ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ease-in-out`} />
                            <FaMoon className={`text-lg text-black ${theme ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ease-in-out`} />
                        </button>
                        <button className='hover:text-primaryYellow active:text-primaryYellowMedium transition-all cursor-pointer text-2xl'>
                            <FaUser />
                        </button>
                        <button className='hover:text-primaryYellow active:text-primaryYellowMedium transition-all cursor-pointer text-2xl'>
                            <FaCartShopping />
                        </button>
                    </div>

                </div>


            </div>

            {/* SecondaryNav */}
            <div className={`fixed flex justify-center items-center w-full  md:h-7 bg-primaryYellowMedium mt-14 md:mt-16 z-10 transition-transform duration-300 ${showSecondaryNav ? 'translate-y-0' : '-translate-y-full'} `}>
                <div className='flex flex-col items-center py-2 gap-2 w-11/12 xl:w-10/12 2xl:w-9/12'>

                    {/* MOBILE RESPONSIVE  */}
                    <form action='' className='md:hidden w-full flex items-center'>
                        <FaMagnifyingGlass className='absolute ml-3 z-20 text-black' />
                        <input
                            type="search"
                            name='search'
                            id='search'
                            placeholder='Search...'
                            autoComplete='off'
                            className='relative z-10 text-base bg-white text-black w-full p-1.5 rounded-full pl-9 focus:outline-none focus:ring-0 ' />
                    </form>
                    <div className='hidden md:grid lg:grid-cols-5 grid-cols-4 w-full text-xs text-white justify-between'>

                        <div className='flex justify-center p-1 items-center gap-2 w-full h-full cursor-pointer hover:shadow-[inset_0px_5px_15px_-3px_rgba(0,_0,_0,_0.4)] transition-all duration-300'>
                            <FaBullhorn className='text-lg' />
                            POWER DEALS
                        </div>
                        <div className='flex justify-center p-1 items-center gap-2 w-full h-full cursor-pointer hover:shadow-[inset_0px_5px_15px_-3px_rgba(0,_0,_0,_0.4)] transition-all duration-300'>
                            <FaPuzzlePiece className='text-lg' />
                            DIA MUNDIAL DO PUZZLE
                        </div>
                        <div className='flex justify-center p-1 items-center gap-2 w-full h-full cursor-pointer hover:shadow-[inset_0px_5px_15px_-3px_rgba(0,_0,_0,_0.4)] transition-all duration-300'>
                            <img className='w-6' src={lego}></img>
                            LEGO DAY
                        </div>
                        <div className='flex justify-center p-1 items-center gap-2 w-full h-full cursor-pointer hover:shadow-[inset_0px_5px_15px_-3px_rgba(0,_0,_0,_0.4)] transition-all duration-300'>
                            <img className='w-7' src={fnacRestart}></img>
                            RETOMAS FNAC
                        </div>
                        <div className='hidden lg:flex justify-center p-1 items-center gap-2 w-full h-full cursor-pointer hover:shadow-[inset_0px_5px_15px_-3px_rgba(0,_0,_0,_0.4)] transition-all duration-300'>
                            <img className='w-6' src={NTF}></img>
                            NOVOS TALENTOS FNAC
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default NavBar