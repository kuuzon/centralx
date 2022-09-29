import React from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

const Styles = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  box-sizing: border-box;
  background: var(--primary);
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
        <div>
          <Button variant="dark">{button}</Button>
        </div>
      )}
    </Styles>
  )
}

export default HeroBox