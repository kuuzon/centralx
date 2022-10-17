import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import styled from 'styled-components';

const StyledInput = styled(Form.Group)`
  margin: 2rem 0;
  text-align: center;
  font-weight: 600;
  font-size: 0.9em;
  letter-spacing: 0.1em;
  outline: none;
  border: 2px solid rgba(0, 0, 0, 0.02);
  border-radius: 1rem;
  color: var(--complementary);
  background: rgba(136, 126, 126, 0.04);
  transition: all 0.2s;

  &:focus {
    border: 2px solid var(--highlight);
    box-shadow: none;
    transform: scale(1.01);
  }
`;

const CXInputGroup = (props) => {
  const { name, label, denom, type, value, onChange } = props;

  return (
    <StyledInput>
    <InputGroup>
      <Form.Label className="visually-hidden" id={name}>{label}</Form.Label>
      <InputGroup.Text>{denom}</InputGroup.Text>
      <Form.Control
        name={name}
        type={type} 
        placeholder={`Enter ${label}`}
        value={value}
        onChange={onChange}
        aria-label={label}
        aria-describedby={label}
      />
    </InputGroup>
    </StyledInput>
  )
}

export default CXInputGroup