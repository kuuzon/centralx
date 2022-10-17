import React from 'react';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';

const StyledInput = styled(Form.Control)`
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

const CXInput = (props) => {
  const { name, label, type, value, onChange } = props;

  return (
    <Form.Group>
      <Form.Label className="visually-hidden" id={name}>{label}</Form.Label>
      <StyledInput
        name={name}
        type={type} 
        placeholder={`Enter ${label}`}
        value={value}
        onChange={onChange}
        aria-label={label}
        aria-describedby={label}
      />
    </Form.Group>
  )
}

export default CXInput