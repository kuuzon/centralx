import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

// Import npm packages & components
import styled from 'styled-components';
import errorIcon from '../../assets/errorIcon.png';

const Image = styled.img`
  width: 400px;
  margin-top: 2rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--brand);
`;

// ERROR: We still render a redirect page on error, but use react-toastify to show a dynamic error popup message (https://fkhadra.github.io/react-toastify/introduction)
const ErrorPage = () => {
  return (
    <Fragment>
      <Image src={errorIcon} alt="error" />
      <h2>
        Error Page: &nbsp; 
        <StyledLink to="/">Return to Home</StyledLink>
      </h2>
    </Fragment>
  )
}

export default ErrorPage