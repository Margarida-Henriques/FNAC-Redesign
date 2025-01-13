import React, { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import ThemeContext from './ThemeContext';


const App = () => {
  const [theme, setTheme] = useState(false);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`${theme && "dark"}`}>
        <div className={`w-full h-screen flex justify-center bg-backgroundLight dark:bg-backgroundDark duration-300`}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/Category' element={<CategoryPage />} />
              <Route path='/Product' element={<ProductPage />} />
            </Routes>
          </BrowserRouter>

        </div>
      </div>
    </ThemeContext.Provider >
  )
}

export default App