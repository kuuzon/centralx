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
import CurrencyDetail from './pages/Currency/CurrencyDetail';
import EditCurrency from './pages/Currency/EditCurrency';
// PAGES: CRYPTO SUB-ROUTES
import CryptoMenu from './pages/Crypto/CryptoMenu';

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
          <Route path="add" element={<AddCurrency />} />
          <Route path=":id" element={<CurrencyDetail />} />
          <Route path="edit/:id" element={<EditCurrency />} />
        </Route>
        {/* CRYPTO: EXTERNAL API */}
        <Route path="crypto">
          <Route path="prices" element={<CryptoMenu />} />
        </Route>
        {/* ERROR PAGES */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

// ISSUES
// - name of preview image no longer works due to image input change
// - fileServices.js cannot find the file to upload half the time (ENOENT error) - race condition issue, now inconsistent on PUT.  fileServerUpload.js needs to execute FIRST then rest (very close)

// TO DOS
// - Create startup README.md for WHOLE application (incl. reworking .ENV)
// - Refactor CSS into reusable components (`CXNavLink`, `StyledLabel`, `StyledInput` and `UserNav`)

// OPTIONAL TODOS
// - Refactor login/register forms into reusable components