// Import react modules
import React from 'react';

//Import npm packages
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .container {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
  }

  .lead-card {
    margin: auto;
    padding: 2rem;
    background-color: var(--primary);
    border-radius: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    text-align: center;

    min-width: ${props => props.authform ? "30vw" : "60vw"};
  }

  .lead-card .card-title {
    padding-bottom: 1rem;
    font-size: 2em;
    font-weight: 600;
    color: var(--brand);
  }
`;

const CardContainer = ({title, authform, children}) => (
  <Styles authform={authform ? 1 : 0}> 
    <Container>
      <div className="lead-card">
        <p className="card-title">{title}</p>
        <div>
          {children}
        </div>
      </div>
    </Container>
  </Styles>
);

export default CardContainer