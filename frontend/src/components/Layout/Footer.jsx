import React from 'react'

import { FaSquareYoutube, FaSquareInstagram, FaSquareFacebook, FaSquareXTwitter } from "react-icons/fa6";
import logo from '../../assets/logoY.png'

const Footer = () => {
    return (
        <footer className='flex flex-col bg-backgroundDark gap-10 mt-10 py-14'>
            <div className='flex justify-between gap-10 self-center w-11/12 sm:w-11/12 xl:w-10/12 2xl:w-9/12 text-white'>
                <div className='flex flex-col gap-4'>
                    <img src={logo} className='h-11'></img>
                    <div className='flex justify-between text-backgroundLight'>
                        <FaSquareInstagram className='h-8 w-8 cursor-pointer hover:scale-110 transition-transform duration-200'></FaSquareInstagram>
                        <FaSquareFacebook className='h-8 w-8 cursor-pointer hover:scale-110 transition-transform duration-200'></FaSquareFacebook>
                        <FaSquareXTwitter className='h-8 w-8 cursor-pointer hover:scale-110 transition-transform duration-200'></FaSquareXTwitter>
                        <FaSquareYoutube className='h-8 w-8 cursor-pointer hover:scale-110 transition-transform duration-200'></FaSquareYoutube>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='font-semibold text-lg'>Customer Support</div>
                    <ul className='flex flex-col gap-1'>
                        <li className='hover:underline cursor-pointer w-fit text-sm'>Help Center</li>
                        <li className='hover:underline cursor-pointer w-fit text-sm'>Shipping & Delivery</li>
                        <li className='hover:underline cursor-pointer w-fit text-sm'>Exchanges & Returns</li>
                        <li className='hover:underline cursor-pointer w-fit text-sm'>Warranty</li>
                        <li className='hover:underline cursor-pointer w-fit text-sm'>Repairs</li>
                    </ul>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='font-semibold text-lg'>Legal Information</div>
                    <ul className='flex flex-col gap-1'>
                        <li className='hover:underline cursor-pointer w-fit text-sm'>Terms & Conditions</li>
                        <li className='hover:underline cursor-pointer w-fit text-sm'>Privacy Policy</li>
                        <li className='hover:underline cursor-pointer w-fit text-sm'>Cookie Policy</li>
                        <li className='hover:underline cursor-pointer w-fit text-sm'>Dispute Resolution</li>
                        <li className='hover:underline cursor-pointer w-fit text-sm'>Complaint Book</li>
                    </ul>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='font-semibold text-lg'>Useful Links</div>
                    <ul className='flex flex-col gap-1'>
                        <li className='hover:underline cursor-pointer w-fit text-sm'>Blog</li>
                        <li className='hover:underline cursor-pointer w-fit text-sm'>Refurbished</li>
                        <li className='hover:underline cursor-pointer w-fit text-sm'>FNAQ Book Club</li>
                    </ul>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='font-semibold text-lg'>FNAQ</div>
                    <ul className='flex flex-col gap-1'>
                        <li className='hover:underline cursor-pointer w-fit text-sm'>About Us</li>
                        <li className='hover:underline cursor-pointer w-fit text-sm'>Careers</li>
                        <li className='hover:underline cursor-pointer w-fit text-sm'>FNAQ Stores</li>
                    </ul>
                </div>

            </div>

            <hr className="border-t border-neutral-700"></hr>

            <div className='flex justify-between gap-20 self-center w-11/12 sm:w-11/12 xl:w-10/12 2xl:w-9/12 text-white'>
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