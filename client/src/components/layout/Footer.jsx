// Import React modules
import React from 'react';
import styled from 'styled-components';

const MainFooter = styled.div`
  /* GLOBAL THEME  */
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.footer};
  transition: background 0.2s ease-in, color 0.2s ease-in;

  text-align: center;
  border-top: 1px solid var(--highlight);
`;

const Footer = () => {
  // Dynamic Date Function
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <MainFooter className="py-3">
      &copy; {getCurrentYear()} CentralX
    </MainFooter>
  )
}

export default Footer