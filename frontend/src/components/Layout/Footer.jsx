import React from 'react'

import { FaSquareYoutube, FaSquareInstagram, FaSquareFacebook, FaSquareXTwitter, FaAngleRight, FaAngleDown } from "react-icons/fa6";
import logo from '../../assets/logoY.png'
import DropDownFooter from '../dropDown/DropDownFooter';
import footerLinks from '../../data/footerLinks';

const Footer = () => {
    return (
        <footer className='flex flex-col bg-backgroundDark gap-10 mt-10 py-14 px-10'>
            <div className='flex justify-center items-center flex-col md:gap-10 self-center w-full xl:w-10/12 2xl:w-9/12 text-white
                md:flex-row md:justify-between md:items-start'>
                <div className='flex flex-col gap-4 w-fit'>
                    <img src={logo} className='h-11'></img>
                    <div className='flex justify-between items-center text-backgroundLight'>
                        <FaSquareInstagram className='h-8 w-8 cursor-pointer hover:scale-110 transition-transform duration-200'></FaSquareInstagram>
                        <FaSquareFacebook className='h-8 w-8 cursor-pointer hover:scale-110 transition-transform duration-200'></FaSquareFacebook>
                        <FaSquareXTwitter className='h-8 w-8 cursor-pointer hover:scale-110 transition-transform duration-200'></FaSquareXTwitter>
                        <FaSquareYoutube className='h-8 w-8 cursor-pointer hover:scale-110 transition-transform duration-200'></FaSquareYoutube>
                    </div>
                </div>

                {/* Footer Links (Desktop) */}
                {footerLinks.map((item, key) => (
                    <div key={key} className='hidden md:block'>
                        <div className='font-semibold text-lg'>{item.title}</div>
                        {item.links.map((link, key) => (
                            <ul key={key} className='flex flex-col gap-1'>
                                <li className='hover:underline cursor-pointer w-fit text-sm'>{link}</li>
                            </ul>
                        ))}
                    </div>
                ))}



                {/* Footer Links (Mobile) */}
                <div className='md:hidden flex flex-col gap-8 mt-14 w-full'>
                    {footerLinks.map((item, key) => (
                        <div key={key}>
                            <DropDownFooter
                                title={item.title}
                                content={
                                    <div>
                                        {item.links.map((link, key) => (
                                            <ul key={key} className='flex flex-col'>
                                                <li className='cursor-pointer w-fit text-sm mt-2'>{link}</li>
                                            </ul>
                                        ))}
                                    </div>}
                            />
                        </div>
                    ))}
                </div>


            </div>

            <hr className="border-t border-neutral-700"></hr>

            <div className='flex justify-between items-center flex-col-reverse md:flex-row gap-8 self-center w-11/12 sm:w-11/12 xl:w-10/12 2xl:w-9/12 text-white'>
                <div className='text-sm text-gray-400'>⚫ 2025 FNAQ. All rights reserved.</div>

                <div className='flex gap-2'>
                    <div className='h-6 w-9 bg-orange-500 rounded-lg'></div>
                    <div className='h-6 w-9 bg-blue-950 rounded-lg'></div>
                    <div className='h-6 w-9 bg-sky-500 rounded-lg'></div>
                    <div className='h-6 w-9 bg-red-700 rounded-lg'></div>
                    <div className='h-6 w-9 bg-blue-800 rounded-lg'></div>
                </div>
            </div>
        </footer>
    )
}

export default Footer