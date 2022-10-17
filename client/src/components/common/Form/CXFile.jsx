import React from 'react';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';

const StyledGroup = styled(Form.Group)`
  margin: 2rem 0 3rem 0;
`;

const StyledLabel = styled(Form.Label)`
  text-align: center;
  font-weight: 600;
  font-size: 0.9em;
  letter-spacing: 0.1em;
  color: var(--highlight-super-dark);
`;

const StyledControl = styled(Form.Control)`
  font-weight: 600;
  font-size: 0.9em;
  letter-spacing: 0.1em;
  color: var(--highlight-super-dark);
  border: 2px solid var(--highlight-light);
  border-radius: 1rem;
`;

const CXInput = (props) => {
  const { label, onChange } = props;

  return (
    <StyledGroup>
      <StyledLabel>{label}</StyledLabel>
      <StyledControl
        type="file"
        onChange={onChange}
      />
    </StyledGroup>

  )
}

export default CXInput