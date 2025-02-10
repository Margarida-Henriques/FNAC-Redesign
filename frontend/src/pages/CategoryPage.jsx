import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar.jsx'
import Context from '../Context';
import Slider from '../components/Slider/Slider.jsx';
import ProductCard from '../components/Cards/ProductCard.jsx';


const CategoryPage = () => {
    const [products, setProducts] = useState([]);
    const { categorySearched, setCategorySearched } = useContext(Context);

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [filterBrand, setFilterBrand] = useState([]);
    const [filterDiscount, setFilterDiscount] = useState(false);
    const [brandsList, setBrandsList] = useState([]);
    const [filterSpecs, setFilterSpecs] = useState({});

    const [currentCategory, setCurrentCategory] = useState(null);


    useEffect(() => {
        const fetchProductsAndCategory = async () => {
            try {
                const [productsResponse, categoriesResponse] = await Promise.all([
                    axios.get('http://localhost:5555/products', {
                        params: { subcategory: categorySearched }
                    }),
                    axios.get('http://localhost:5555/category')
                ]);

                setProducts(productsResponse.data);
                setFilteredProducts(productsResponse.data);

                // Find current category and its filters
                const category = categoriesResponse.data.find(cat =>
                    cat.subcategories.some(sub => sub.name === categorySearched)
                );
                console.log(category)
                setCurrentCategory(category);

                const uniqueBrands = [...new Set(productsResponse.data.map(product => product.brand))];
                setBrandsList(uniqueBrands);

            } catch (error) {
                console.error('Error fetching products:', error);
            };
        }
        fetchProductsAndCategory();
    }, [categorySearched]);


    //FILTERS_______________________________________________________!

    //Filter Products!!!!
    useEffect(() => {

        let filtered = products;

        // Discount filter

        if (filterDiscount) {
            filtered = filtered.filter(product => product.discount !== null);
        }

        // Brand filter
        if (filterBrand.length > 0) {
            filtered = filtered.filter(product => filterBrand.includes(product.brand));
        }

        // Price filter
        filtered = filtered.filter(
            (product) => product.price >= priceRange.min && product.price <= priceRange.max
        );

        setFilteredProducts(filtered);


    }, [filterDiscount, filterBrand, priceRange, products]);

    //Filter brand
    const toggleBrand = (brand) => {
        setFilterBrand(prev => {
            if (prev.includes(brand)) {
                return prev.filter(prevBrand => prevBrand !== brand)
            } else {
                return [...prev, brand];
            }

        })
    }

    const countProductPerBrand = (brand) => {
        return products.filter(product => product.brand === brand).length;
    }

    //Filter Specs
    const renderCategoryFilters = () => {
        const subcategory = currentCategory?.subcategories.find(sub => sub.name === categorySearched);
        return subcategory?.filters.map(filter => (
            <div key={filter.name}>
                <div className='pt-3 mt-5 border-t mb-2'>{filter.displayName}</div>
                <form>
                    {filter.options.map((option, index) => (
                        <div key={index} className='flex flex-row items-center'>
                            <input
                                type="checkbox"
                                id={option}
                                name={option}
                                value={option}
                                className='peer h-4 w-4 cursor-pointer'
                                onClick={() => toggleSpecs(filter.name, option)}
                                checked={filterSpecs[filter.name]?.includes(option) || false}
                            />
                            <label className='ml-1' htmlFor={option}>
                                {option}
                            </label>
                        </div>
                    ))}
                </form>
            </div>
        ));
    };

    const toggleSpecs = (specKey, specValue) => {

        setFilterSpecs(prev => {
            const newSpecs = { ...prev };

            // If this spec key doesn't exist yet, create an array for it
            if (!newSpecs[specKey]) {
                newSpecs[specKey] = [specValue];
            } else {
                // If value exists, remove it; if not, add it
                if (newSpecs[specKey].includes(specValue)) {
                    newSpecs[specKey] = newSpecs[specKey].filter(value => value !== specValue);
                    // If array is empty, remove the key entirely
                    if (newSpecs[specKey].length === 0) {
                        delete newSpecs[specKey];
                    }
                } else {
                    newSpecs[specKey] = [...newSpecs[specKey], specValue];
                }
            }

            return newSpecs;
        });
    }


    return (
        <div className=''>
            <NavBar />
            <SideBar />
            <div className='flex justify-center pb-10'>
                <div className='flex gap-4 mt-28 w-full sm:w-11/12 xl:w-10/12 2xl:w-9/12'>

                    {/* FILTERS */}
                    <div className='hidden flex-col lg:flex w-[280px] min-h-screen bg-white dark:bg-zinc-800 dark:text-neutral-300 p-2 rounded'>
                        <div className='text-xl border-b py-2 mb-3'>FILTER</div>
                        <div className="">Preço</div>

                        {/* Price */}
                        <Slider
                            min={0}
                            max={1000}
                            onChange={({ min, max }) => {
                                setPriceRange(prev =>
                                    prev.min !== min || prev.max !== max ? { min, max } : prev
                                );
                            }}
                        />

                        {/* Brand */}
                        <div className='pt-3 border-t mb-2'>Brand</div>
                        <form>
                            {brandsList.map((brand, index) => (
                                <div className='flex flex-row items-center' key={index}>
                                    <input className='peer h-4 w-4 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-600 checked:border-slate-800'
                                        type="checkbox"
                                        id={brand}
                                        name={brand}
                                        value={brand}
                                        onClick={() => { toggleBrand(brand) }}

                                    />
                                    <svg className="absolute h-4 w-4 pointer-events-none opacity-0 peer-checked:opacity-100" viewBox="0 0 20 20" fill="white" stroke="white"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                                    <label className='ml-1' htmlFor={brand}> {brand} <span className='text-gray-400 text-sm'>({countProductPerBrand(brand)})</span></label>
                                </div>
                            ))}
                        </form>

                        {/* Specs */}
                        {renderCategoryFilters()}


                        {/* Discount */}
                        <div className='pt-3 mt-5 border-t mb-2'>Related to Product</div>
                        <form>
                            <div className='flex flex-row items-center'>
                                <input className='peer h-4 w-4 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-600 checked:border-slate-800'
                                    type="checkbox"
                                    id={"discount"}
                                    name={"discount"}
                                    value={"discount"}
                                    onChange={() => (setFilterDiscount(!filterDiscount))}
                                    checked={filterDiscount}
                                />
                                <svg className="absolute h-4 w-4 pointer-events-none opacity-0 peer-checked:opacity-100" viewBox="0 0 20 20" fill="white" stroke="white"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                                <label className='ml-1' htmlFor={"discount"} >Discounts</label>
                            </div>
                            <div className='flex flex-row items-center'>
                                <input className='peer h-4 w-4 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-600 checked:border-slate-800'
                                    type="checkbox"
                                    id={"discount"}
                                    name={"discount"}
                                    value={"discount"}
                                    onChange={() => (setFilterDiscount(!filterDiscount))}
                                    checked={filterDiscount}
                                />
                                <svg className="absolute h-4 w-4 pointer-events-none opacity-0 peer-checked:opacity-100" viewBox="0 0 20 20" fill="white" stroke="white"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                                <label className='ml-1' htmlFor={"discount"} >Stock</label>
                            </div>
                        </form>
                    </div>

                    {/* PRODUCTS GRID ________________________________________________________________________________________________________________________*/}

                    <div className="grid h-fit grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 ">
                        {filteredProducts.map((product, index) => (
                            <ProductCard key={index} product={product} index={index}></ProductCard>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CategoryPage