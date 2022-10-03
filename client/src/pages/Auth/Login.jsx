import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import npm packages
import { Form } from 'react-bootstrap';
import styled from 'styled-components';

// Import custom modules
import authService from '../../services/authService';
import useAuth from '../../hooks/useAuth';
import CardContainer from '../../components/common/CardContainer';
import CXButton from '../../components/common/CXButton';

const StyledLabel = styled(Form.Label)`
  display: none;
`;

const StyledInput = styled(Form.Control)`
  margin: 2rem 0;
  text-align: center;
  font-weight: 600;
  font-size: 0.9em;
  letter-spacing: 0.1em;
  outline: none;
  box-sizing: border-box;
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

const UserNav = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  font-size: 0.9em;
  font-style: italic;

  a {
    text-decoration: none;
    color: var(--brand);

    &:hover {
      color: var(--brand-dark);
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  // HOOK: CONTEXT FOR AUTH
  const { loginSaveUser } = useAuth();
  // REACT-ROUTER DOM HOOKS
  const navigate = useNavigate();

  // HOOK: SETTING COMPONENT STATE (& init values)
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  // Destructure data state nested object properties
  const { email, password } = user;

  // FORM FUNCTIONS
  // [1] handleTextChange handles state value change for all login data
  const handleTextChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  // [2] handleSubmit will submit form data to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authService.login(user);
      loginSaveUser(response.data);
      navigate('/dashboard');
    } catch(err) {
      console.log(err?.response);
    }
  }

  return (
    <CardContainer title="Login" authform>
      <Form onSubmit={ handleSubmit }>
        {/* GROUP 1: EMAIL */}
        <Form.Group className="mb-3" controlId="email">
          <StyledLabel>Email</StyledLabel>
          <StyledInput type="email" placeholder="Enter email" name="email" value={email} onChange={ handleTextChange } required />
        </Form.Group>

        {/* GROUP 2: PASSWORD */}
        <Form.Group className="mb-3" controlId="password">
          <StyledLabel>Password</StyledLabel>
          <StyledInput type="password" placeholder="Enter password" name="password" value={password} onChange={ handleTextChange } required />
        </Form.Group>

        {/* SUBMIT BUTTON */}
        <CXButton loadingState={loading}>
          {loading ? '...' : 'Submit'}
        </CXButton>
      </Form>
      <UserNav>
        Not a member? &nbsp; <Link to="/signup">Sign Up</Link>
      </UserNav>
    </CardContainer>
  )
}

export default Login