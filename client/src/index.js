import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Global Stylesheet & Imported Stylesheets
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

// Root component import
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);