import React from 'react';
import styled from 'styled-components';
import CXNavLink from './CXNavLink';

const Styles = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 40px;
  text-align: center;
`;

const HeroBox = ({ title, content, button }) => {
  return (
    <Styles>
      <h1>{title}</h1>
      <p>{content}</p>
      { button && (
        <div className="mt-4">
          <CXNavLink to={"/crypto/prices"}>{button}</CXNavLink>
        </div>
      )}
    </Styles>
  )
}

export default HeroBox