import React, { createContext, useState } from 'react';

const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
    const [theme, setTheme] = useState(false);
    const [sideBar, setSideBar] = useState(false);
    const [categorySearched, setCategorySearched] = useState();
    const [favorites, setFavorites] = useState([]);
    const [deal, setDeal] = useState();

    const contextValue = {
        theme,
        setTheme,
        sideBar,
        setSideBar,
        categorySearched,
        setCategorySearched,
        favorites,
        setFavorites,
        deal,
        setDeal
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContext;