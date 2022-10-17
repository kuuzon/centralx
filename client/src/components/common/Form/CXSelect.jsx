import React from 'react';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';

const StyledInput = styled(Form.Control)`
  margin: 2rem 0;
  text-align: center;
  font-weight: 600;
  font-size: 0.9em;
  letter-spacing: 0.1em;
  border: 2px solid rgba(0, 0, 0, 0.02);
  border-radius: 1rem;
  color: var(--highlight-super-dark);
  background: rgba(136, 126, 126, 0.04);

  /* SPECIFIC TO SELECT */
  display: block;
  padding: .375rem .75rem;
  width: 100%;
`;

const CXSelect = (props) => {
  const { name, label, value, items, onChange } = props;

  return (
    <Form.Group>
      <Form.Label className="visually-hidden" htmlFor={name}>{label}</Form.Label>
      <StyledInput
        name={name}
        as="select"
        id={name}
        value={value}
        onChange={onChange}
      >
        <option>{`Please select the ${label}`}</option>
        {items.map((item, index) => {
          return (
            <option value={item._id} key={index}>
              {item.name}
            </option>
          );
        })}
      </StyledInput>
    </Form.Group>
  )
}

export default CXSelect