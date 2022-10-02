// Import React modules
import React from 'react';
import { Link } from 'react-router-dom';

// Import npm packages
import { Nav, Navbar, Container } from "react-bootstrap";
import { RiExchangeFundsLine } from 'react-icons/ri';
import styled from 'styled-components';

// Import custom modules
import useAuth from '../../hooks/useAuth';
import CXButton from '../../components/common/CXButton';
import CXNavLink from '../common/CXNavLink';

const StyledNavbar = styled(Navbar)`
  background-color: var(--primary);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;   /* ATTACH TO SCROLL EVENT */
`;

const StyledLogo = styled(RiExchangeFundsLine)`
  font-size: 1.5rem;
  margin-bottom: 0.2rem;
  color: var(--brand);
  transition: all 1s;

  &:hover {
    transform: scale(1.10) rotateZ(180deg);
  }
`;

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <StyledNavbar variant="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <StyledLogo />
          {' '}
          CentralX
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* STANDARD NAVLINKS */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/currency/prices">CBDC</Nav.Link>
            <Nav.Link as={Link} to="/crypto/prices">Crypto</Nav.Link>
          </Nav>
          {/* AUTH NAVLINKS */}
          <Nav>
            {!user && <CXNavLink to="/signup" navbar>Sign Up</CXNavLink>}
            {!user && <CXNavLink to="/login" outline navbar>Log In</CXNavLink>}
            {user && <CXNavLink as={Link} to="/dashboard" navbar>Dashboard</CXNavLink>}
            {user && <CXButton onClick={() => { logout() }} outline navbar>Logout</CXButton>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  )
}

export default Header
