import React, { useEffect, useState, useContext, useMemo, useCallback } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar.jsx';
import Context from '../Context';
import Slider from '../components/FilterSlider/Slider.jsx';
import ProductCard from '../components/Cards/ProductCard.jsx';

const CategoryPage = () => {
    const [products, setProducts] = useState([]);
    const { categorySearched } = useContext(Context);
    const [filters, setFilters] = useState({
        priceRange: { min: 0, max: 2000 },
        brands: [],
        showDiscounted: false,
        showInStock: false,
        specs: {}
    });
    const [currentCategory, setCurrentCategory] = useState(null);
    const [brandsList, setBrandsList] = useState([]);

    // Fetch products and category data
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

                // Find current category and its filters
                const category = categoriesResponse.data.find(cat =>
                    cat.subcategories.some(sub => sub.name === categorySearched)
                );
                setCurrentCategory(category);

                const uniqueBrands = [...new Set(productsResponse.data.map(product => product.brand))];
                setBrandsList(uniqueBrands);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProductsAndCategory();
    }, [categorySearched]);

    // Filter products 
    const filteredProducts = useMemo(() => {
        return products.filter(product => {

            // Price filter
            const withinPriceRange =
                product.price >= filters.priceRange.min &&
                product.price <= filters.priceRange.max;
            if (!withinPriceRange) return false;

            // Brand filter
            if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
                return false;
            }

            // Discount filter
            if (filters.showDiscounted && !product.discount) {
                return false;
            }

            // Stock filter
            if (filters.showInStock && !product.stock) {
                return false;
            }

            // Specs filter
            if (Object.keys(filters.specs).length > 0) {
                return Object.entries(filters.specs).every(([specKey, selectedValues]) => {
                    if (!product.specs?.[specKey]) return false;

                    if (specKey === 'display_size') {
                        return selectedValues.includes(product.specs.display_category);
                    }

                    return selectedValues.includes(product.specs[specKey]);
                });
            }

            return true;
        });
    }, [products, filters]);

    // Filter update handlers
    const updatePriceRange = useCallback(({ min, max }) => {
        setFilters(prev => ({
            ...prev,
            priceRange: { min, max }
        }));
    }, []);

    const toggleBrand = (brand) => {
        setFilters(prev => ({
            ...prev,
            brands: prev.brands.includes(brand)
                ? prev.brands.filter(b => b !== brand)
                : [...prev.brands, brand]
        }));
    };

    const toggleSpecs = (specKey, specValue) => {
        setFilters(prev => {
            const currentSpecs = { ...prev.specs };

            if (!currentSpecs[specKey]) {
                currentSpecs[specKey] = [specValue];
            } else if (currentSpecs[specKey].includes(specValue)) {
                currentSpecs[specKey] = currentSpecs[specKey].filter(v => v !== specValue);
                if (currentSpecs[specKey].length === 0) {
                    delete currentSpecs[specKey];
                }
            } else {
                currentSpecs[specKey] = [...currentSpecs[specKey], specValue];
            }

            return {
                ...prev,
                specs: currentSpecs
            };
        });
    };

    const countProductsByBrand = (brand) => {
        return products.filter(product => product.brand === brand).length;
    };

    const renderCategoryFilters = () => {
        const subcategory = currentCategory?.subcategories.find(
            sub => sub.name === categorySearched
        );

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
                                className='peer h-4 w-4 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-600 checked:border-slate-800'
                                onChange={() => toggleSpecs(filter.name, option)}
                                checked={filters.specs[filter.name]?.includes(option) || false}
                            />
                            <svg
                                className="absolute h-4 w-4 pointer-events-none opacity-0 peer-checked:opacity-100"
                                viewBox="0 0 20 20"
                                fill="white"
                                stroke="white"
                            >
                                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                            </svg>
                            <label className='ml-1' htmlFor={option}>
                                {option}
                            </label>
                        </div>
                    ))}
                </form>
            </div>
        ));
    };

    return (
        <div className=''>
            <NavBar />
            <SideBar />
            <div className='flex justify-center pb-10'>
                <div className='flex gap-4 mt-28 w-full sm:w-11/12 xl:w-10/12 2xl:w-9/12'>
                    {/* Filters Sidebar */}
                    <div className='hidden flex-col lg:flex w-[280px] min-h-screen bg-white dark:bg-zinc-800 dark:text-neutral-300 p-2 rounded'>
                        <div className='text-xl border-b py-2 mb-3'>FILTER</div>

                        {/* Price Filter */}
                        <div className="">Price</div>
                        <Slider
                            min={0}
                            max={2000}
                            onChange={updatePriceRange}
                        />

                        {/* Brand Filter */}
                        <div className='pt-3 border-t mb-2'>Brand</div>
                        <form>
                            {brandsList.map((brand, index) => (
                                <div className='flex flex-row items-center' key={index}>
                                    <input
                                        className='peer h-4 w-4 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-600 checked:border-slate-800'
                                        type="checkbox"
                                        id={brand}
                                        name={brand}
                                        value={brand}
                                        onChange={() => toggleBrand(brand)}
                                        checked={filters.brands.includes(brand)}
                                    />
                                    <svg
                                        className="absolute h-4 w-4 pointer-events-none opacity-0 peer-checked:opacity-100"
                                        viewBox="0 0 20 20"
                                        fill="white"
                                        stroke="white"
                                    >
                                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                    </svg>
                                    <label className='ml-1' htmlFor={brand}>
                                        {brand} <span className='text-gray-400 text-sm'>({countProductsByBrand(brand)})</span>
                                    </label>
                                </div>
                            ))}
                        </form>

                        {/* Specs Filters */}
                        {renderCategoryFilters()}

                        {/* Additional Filters */}
                        <div className='pt-3 mt-5 border-t mb-2'>Related to Product</div>
                        <form>
                            {/* Discount Filter */}
                            <div className='flex flex-row items-center'>
                                <input
                                    className='peer h-4 w-4 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-600 checked:border-slate-800'
                                    type="checkbox"
                                    id="discount"
                                    name="discount"
                                    value="discount"
                                    onChange={() => setFilters(prev => ({ ...prev, showDiscounted: !prev.showDiscounted }))}
                                    checked={filters.showDiscounted}
                                />
                                <svg
                                    className="absolute h-4 w-4 pointer-events-none opacity-0 peer-checked:opacity-100"
                                    viewBox="0 0 20 20"
                                    fill="white"
                                    stroke="white"
                                >
                                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                </svg>
                                <label className='ml-1' htmlFor="discount">Discounts</label>
                            </div>

                            {/* Stock Filter */}
                            <div className='flex flex-row items-center'>
                                <input
                                    className='peer h-4 w-4 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-600 checked:border-slate-800'
                                    type="checkbox"
                                    id="stock"
                                    name="stock"
                                    value="stock"
                                    onChange={() => setFilters(prev => ({ ...prev, showInStock: !prev.showInStock }))}
                                    checked={filters.showInStock}
                                />
                                <svg
                                    className="absolute h-4 w-4 pointer-events-none opacity-0 peer-checked:opacity-100"
                                    viewBox="0 0 20 20"
                                    fill="white"
                                    stroke="white"
                                >
                                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                </svg>
                                <label className='ml-1' htmlFor="stock">Stock</label>
                            </div>
                        </form>
                    </div>

                    {/* Products Grid */}
                    <div className="grid h-fit grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {filteredProducts.map((product, index) => (
                            <ProductCard
                                key={index}
                                product={product}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;