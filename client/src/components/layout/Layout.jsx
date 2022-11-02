// Import react modules
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';

// Import npm packages
import styled from 'styled-components';

// Import components
import Header from './Header';
import Footer from './Footer';

const AppWrap = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  flex: 1;
`;

const Layout = () => (
  <div className="app">
    {/* TOAST is a popup component to display Errors */}
    <ToastContainer 
      style={{ textAlign: "center" }} 
      position='top-center'
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      transition={Slide}
      theme="colored"
    />
    <Header />
    {/* Wrap all content in column-direction flexbox */}
    <AppWrap>
      <Outlet />
    </AppWrap>
    <Footer />
  </div>
);

export default Layout