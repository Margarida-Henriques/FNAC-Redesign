import React, { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import Context from './Context';


const App = () => {
  const [theme, setTheme] = useState(false);
  const [sideBar, setSideBar] = useState(false);

  return (
    <Context.Provider value={{ theme, setTheme, sideBar, setSideBar }}>
      <div className={`${theme && "dark"}`}>
        <div className={`w-full h-full bg-backgroundLight dark:bg-backgroundDark duration-300`}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/Category' element={<CategoryPage />} />
              <Route path='/Product' element={<ProductPage />} />
            </Routes>
          </BrowserRouter>

        </div>
      </div>
    </Context.Provider >
  )
}

export default App