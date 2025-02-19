import React, { useEffect, useState, useContext } from 'react';
import Context from '../Context';
import { Link, useNavigate } from 'react-router-dom';
import fnacRestart from '../assets/fnacRestart.png'
import NTF from '../assets/NTF.png'
import logoDark from '../assets/logoDark.png'
import logo from '../assets/logoY.png'
import { FaSun, FaMoon, FaBars, FaUser, FaCartShopping, FaMagnifyingGlass, FaBullhorn, FaCertificate, FaAddressCard, FaHeadset, FaHeart } from "react-icons/fa6";

const NavBar = () => {

    const navigate = useNavigate();

    const { theme, setTheme } = useContext(Context);
    const { sideBar, setSideBar } = useContext(Context);
    const { deal, setDeal } = useContext(Context);
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

    const goToDeal = (deal) => {
        navigate("/");
        setDeal(deal);
    }


    return (
        <div className=''>
            {/* PrimaryNav */}
            <nav className='fixed w-full pb-1 pt-2 flex justify-center items-center flex-col gap-4 bg-backgroundLight dark:bg-backgroundDark  dark:text-white font-semibold text-lg shadow-lg z-20'>
                <div className='flex justify-between w-11/12 xl:w-10/12 2xl:w-9/12'>

                    <div className='flex items-center gap-5'>
                        <div className='hidden md:block'>
                            <Link to={"/"}><img src={`${theme ? logoDark : logo}`} alt='fnac_logo' className=' w-20 hover:scale-105 transition-all duration-200 cursor-pointer' /></Link>
                        </div>
                        <button
                            className='flex flex-row justify-center items-center gap-2 hover:text-primaryYellow active:text-primaryYellowMedium transition-all cursor-pointer'
                            onClick={() => setSideBar(!sideBar)}>
                            <FaBars className='text-2xl' />
                            <div className='hidden md:flex'>PRODUCTS</div>
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
                                className='relative z-10 text-base bg-white w-full p-1.5 rounded-full pl-9 focus:outline-none focus:ring-0 border-[1px]' />
                        </form>
                        <button
                            className=' hover:border-primaryYellowHover p-[7px] rounded-full bg-white active:text-primaryYellowMedium transition-all border-[1px]'
                            onClick={() => setTheme(!theme)}>
                            <FaSun className={`absolute text-lg text-primaryYellowLight ${theme ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ease-in-out`} />
                            <FaMoon className={`text-lg text-primaryYellowLight ${theme ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ease-in-out`} />
                        </button>
                    </div>


                    <div className='flex items-center gap-5 '>

                        {/* Mobile */}
                        <button
                            className='md:hidden hover:border-primaryYellowHover p-[7px] rounded-full bg-white active:text-primaryYellowMedium transition-all border-[1px]'
                            onClick={() => setTheme(!theme)}>
                            <FaSun className={`absolute text-lg text-black ${theme ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ease-in-out`} />
                            <FaMoon className={`text-lg text-black ${theme ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ease-in-out`} />
                        </button>
                        {/*  */}

                        <button className='hover:text-primaryYellow active:text-primaryYellowMedium transition-all cursor-pointer text-2xl'>
                            <FaUser />
                        </button>
                        <button className='hover:text-primaryYellow active:text-primaryYellowMedium transition-all cursor-pointer text-2xl'>
                            <FaCartShopping />
                        </button>
                    </div>

                </div>


            </nav>

            {/* SecondaryNav */}
            <nav className={`fixed flex justify-center items-center w-full h-fit mt-12 md:mt-12 bg-backgroundDark dark:bg-gradient-to-b dark:from-backgroundDark dark:to-stone-800 z-10 transition-transform duration-300 ${showSecondaryNav ? 'translate-y-0' : '-translate-y-full'} `}>
                <div className='flex flex-col items-center gap-2 w-11/12 xl:w-10/12 2xl:w-9/12'>

                    {/* MOBILE RESPONSIVE  */}
                    <form action='' className='md:hidden w-full flex items-center py-[5px]'>
                        <FaMagnifyingGlass className='absolute ml-3 z-20 text-black' />
                        <input
                            type="search"
                            name='search'
                            id='search'
                            placeholder='Search...'
                            autoComplete='off'
                            className='relative z-10 text-base bg-white text-black w-full p-1 rounded-full pl-9 focus:outline-none focus:ring-0 border-[1px]' />
                    </form>

                    <div className='hidden md:grid lg:grid-cols-5 grid-cols-4 w-full text-xs text-white justify-between'>

                        <button onClick={() => { goToDeal("firstDeal") }} className='flex justify-center persp items-center gap-2 w-full h-full py-[8px] hover:shadow-[inset_0px_-4px_0px_0px_rgba(227,_227,_227,_0.7)] transition-all duration-200 cursor-pointer text-red-500'>
                            <FaCertificate className='text-lg' />
                            <div>ON SALE!</div>
                        </button>
                        <button className='flex justify-center items-center gap-2 w-full h-full hover:shadow-[inset_0px_-4px_0px_0px_rgba(227,_227,_227,_0.7)] transition-all duration-300 cursor-pointer text-blue-400'>
                            <FaBullhorn className='text-base' />
                            NEW TECH
                        </button>
                        <button className='hidden lg:flex justify-center items-center gap-2 w-full h-full hover:shadow-[inset_0px_-4px_0px_0px_rgba(227,_227,_227,_0.7)] transition-all duration-300 cursor-pointer text-pink-400'>
                            <FaHeart className='text-base' />
                            DIA DOS NAMORADOS
                        </button>
                        <button className='flex justify-center items-center gap-2 w-full h-full hover:shadow-[inset_0px_-4px_0px_0px_rgba(227,_227,_227,_0.7)] transition-all duration-300 cursor-pointer'>
                            <FaHeadset className='text-base' />
                            SUPPORT
                        </button>
                        <button className='flex justify-center items-center gap-2 w-full h-full bg-primaryYellowMedium hover:shadow-[inset_0px_-4px_0px_0px_rgba(227,_227,_227,_0.7)] transition-all duration-300 cursor-pointer'>
                            <FaAddressCard className='text-base' />
                            FNAQ MEMBERSHIP
                        </button>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar