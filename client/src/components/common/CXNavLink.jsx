import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  border-radius: 1rem;
  transition: all 0.2s;
  padding: 0.4rem 1rem;
  text-decoration: none;
  margin: 0 0.4rem;
  text-align: center;
  font-size: ${props => props.navbar ? "0.9em" : "1em"};
  
  /* GLOBAL THEMES */
  background: ${props => props.outline 
    ? props.theme.body
    : "var(--brand)"
  };
  color: ${props => props.outline 
    ? props.theme.buttonOutline
    : "var(--primary)"
  };
  border: 2px solid ${props => props.outline 
    ? props.theme.buttonOutline
    : "var(--brand)"
  };

  &:hover, &:active, &:focus {
    color: var(--primary);
    background: var(--brand-dark);
    border: 2px solid var(--brand-dark);
    transform: scale(1.02);
    box-shadow: none;
  }
`;

const CXNavLink = ({ to, children, outline, navbar }) => {
  return (
    <StyledLink 
      to={to}
      // HTML CONTROL: Below needs to evaluate to a number of 1 or 0.  Otherwise, evaluates to a "string" of "true" or "false", which causes an error when read to the DOM.
      outline={outline ? 1 : 0}
      navbar={navbar ? 1 : 0}
    >
      {children}
    </StyledLink>
  )
}

export default CXNavLink