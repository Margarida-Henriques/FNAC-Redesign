import React, { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import { ShopContextProvider } from './ShopContext';

const App = () => {
  return (
    <ShopContextProvider>
      <div className="min-h-screen bg-backgroundLight dark:bg-backgroundDark duration-300">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/Category' element={<CategoryPage />} />
            <Route path='/Product' element={<ProductPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ShopContextProvider>
  );
}

export default App;