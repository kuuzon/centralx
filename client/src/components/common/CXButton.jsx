import React from 'react';

// Import npm packages
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  width: 100%;
  border-radius: 1rem;
  border: none;
  background-color: var(--brand);
  transition: all 0.2s;

  &:hover, &:active, &:focus {
    background-color: var(--brand-dark);
    transform: scale(1.02);
    box-shadow: none;
  }
`;

const CXButton = ({ children, loadingState, onClick }) => {
  return (
    <StyledButton 
      type={onClick ? "button" : "submit"} 
      onClick={onClick}
      className={loadingState && "button-gradient-loading"}
      disabled={loadingState}
    >      
      {children}
    </StyledButton>
  )
}

export default CXButton