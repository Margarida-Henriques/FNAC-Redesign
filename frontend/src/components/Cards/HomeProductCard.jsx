import React from 'react';


const HomeProductCard = ({ product, index }) => {


    //CALCULATE DISCOUNT
    const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
        const discountAmount = originalPrice * (discountPercentage / 100);
        const finalPrice = originalPrice - discountAmount;
        return finalPrice;
    };



    return (

        <div key={index} className="relative flex flex-col h-full bg-white dark:bg-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">

            {/* Discount tag */}
            {product.discount && (
                <div className="absolute top-6 right-0 bg-red-600 dark:bg-red-500 text-white px-3 py-1 rounded-l-full font-semibold z-[9]">
                    -{product.discount}%
                </div>
            )}

            {/* Img */}
            <div className="bg-white rounded-t pt-2 px-2 m-2 flex items-center justify-center">
                <img alt={product.name} className="w-full h-48 object-contain hover:scale-105 transition-transform duration-300 z-[8]"
                    src={`/productsImages/${product.img}`}
                />
            </div>

            {/* PRODUCT INFORMATION*/}
            <div className="flex-1 pb-4 px-4 flex flex-col">
                <div className="">

                    {/* Price */}
                    <div className="items-end gap-2 mb-2">
                        {product.discount ? (
                            <>
                                <span className="text-2xl mr-1 font-bold text-red-600 dark:text-red-400">
                                    {calculateDiscountedPrice(product.price, product.discount).toFixed(2)}€
                                </span>
                                <span className="text-sm text-gray-400 line-through">
                                    {product.price}€
                                </span>
                            </>
                        ) : (
                            <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                                {product.price}€
                            </span>
                        )}
                    </div>

                    {/* Info */}
                    <h3 className="font-semibold text-gray-900 dark:text-neutral-300">
                        {product.name}
                    </h3>
                </div>

            </div>
        </div>
    )
}

export default HomeProductCard