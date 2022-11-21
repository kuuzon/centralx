// REACT & ROUTER
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// COMPONENTS:
import Layout from './components/layout/Layout';
import PrivateRoutes from './components/layout/PrivateRoutes';
// PAGES: MAIN ROUTES
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
// PAGES: AUTH
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Auth/Dashboard';
// PAGES: CURRENCY SUB-ROUTES
import CurrencyMenu from './pages/Currency/CurrencyMenu';
import AddCurrency from './pages/Currency/AddCurrency';

import AddNewCurrency from './pages/Currency/AddNewCurrency';

import CurrencyDetail from './pages/Currency/CurrencyDetail';
import EditCurrency from './pages/Currency/EditCurrency';
// PAGES: CRYPTO SUB-ROUTES
import CryptoMenu from './pages/Crypto/CryptoMenu';
import CryptoDetail from './pages/Crypto/CryptoDetail';

function App() {
  return (
    <Routes>
      {/* MAIN LAYOUT WRAPPER & ROUTED CHILDREN */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        {/* AUTH */}
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        {/* PRIVATE AUTH ROUTES */}
        <Route element={<PrivateRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        {/* CURRENCY: API */}
        <Route path="currency">                
          <Route path="prices" element={<CurrencyMenu />} />
          <Route path=":id" element={<CurrencyDetail />} />
          {/* PRIVATE WRITE CURRENCY ROUTES */}
          <Route element={<PrivateRoutes />}>
            <Route path="add" element={<AddCurrency />} />
            <Route path="edit/:id" element={<EditCurrency />} />
          </Route>
        </Route>
        {/* CRYPTO: EXTERNAL API */}
        <Route path="crypto">
          <Route path="prices" element={<CryptoMenu />} />
          <Route path=":id" element={<CryptoDetail />} />
        </Route>
        {/* ERROR PAGES */}
        <Route path="*" element={<NotFound />} />
        {/* TEST PAGES */}
        <Route path="addnew" element={<AddNewCurrency />} />
      </Route>
    </Routes>
  );
}

export default App;

// KNOWN ISSUES
// - Weird loading error on CryptoDetail not showing loading spinner

// EXPANSION
// - Test for duplicate currencies
// - Dashboard needs to be passed user id to URL & create image uploader for Dashboard profile 
// - Refactor CSS into streamlined form component