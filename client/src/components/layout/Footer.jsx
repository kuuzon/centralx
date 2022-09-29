// Import React modules
import React from 'react';
import styled from 'styled-components';

const MainFooter = styled.div`
  text-align: center;
  background: var(--highlight-light);
  color: var(--complementary);
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