import React, { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import ThemeContext from './ThemeContext';


const App = () => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`w-full h-screen flex justify-center ${theme === 'dark' ? 'bg-backgroundDark' : 'bg-backgroundLight'}`}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/Category' element={<CategoryPage />} />
            <Route path='/Product' element={<ProductPage />} />
          </Routes>
        </BrowserRouter>

      </div>
    </ThemeContext.Provider >
  )
}

export default App