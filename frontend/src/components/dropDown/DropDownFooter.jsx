import React, { useState } from 'react'
import { FaAngleDown } from "react-icons/fa6";

function DropDownFooter({ title, content }) {

    const [open, setOpen] = useState(false);
    console.log(open)

    return (
        <div
            className='md:hidden relative text-white w-full'
            onClick={() => setOpen(!open)}
        >

            <div className='flex justify-between w-full items-center flex-row font-semibold text-lg'>
                {title}

                <FaAngleDown className={`transition-transform duration-300 ${open ? "-rotate-180" : "rotate-0"}`} />
            </div>

            <div
                className={`transition-all origin-top duration-500 overflow-hidden ${open ? "max-h-[170px] opacity-100 scale-y-100" : "max-h-0 opacity-0 scale-y-95"
                    }`}
            >
                {content}
            </div>


        </div>
    )
}

export default DropDownFooter