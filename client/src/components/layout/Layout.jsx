import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import { ThemeProvider } from 'styled-components';

// Import components
import Header from './Header';
import Footer from './Footer';
import GlobalStyle from '../../styles/globalStyle';
import { lightTheme, darkTheme } from '../../styles/theme';

function Layout(){
  const [theme, setTheme] = useState("light");
  const isDarkTheme = theme === "dark";
  
  // Theme Toggle Function
  const toggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark");
  }

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyle />
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
        <Header toggleTheme={toggleTheme} />
        {/* Wrap all content in column-direction flexbox */}
        <div className="appContent">
          <Outlet />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default Layout