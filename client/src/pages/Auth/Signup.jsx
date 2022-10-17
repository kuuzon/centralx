import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import npm packages
import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import { toast } from 'react-toastify';

// Import custom modules
import authService from '../../services/authService';
import useAuth from '../../hooks/useAuth';
import CXCard from '../../components/common/CXCard';
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

const Signup = () => {
  // HOOK: CONTEXT FOR AUTH
  const { loginSaveUser } = useAuth();
  // REACT-ROUTER DOM HOOKS
  const navigate = useNavigate();

  // HOOK: SETTING COMPONENT STATE (& init values)
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  // Destructure data state nested object properties
  const { username, email, password } = user;

  // HOOK: useRef
  const passwordConfirmRef = useRef();

  // FORM FUNCTIONS
  // [1] handleTextChange handles state value change for all login data
  const handleTextChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  // [2] handleSubmit will submit form data to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Early Validation - Error Check First
    if(password !== passwordConfirmRef.current.value){
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    // API Call to Write User Data
    try {
      const response = await authService.register(user);
      loginSaveUser(response.data);
      navigate('/dashboard');
    } catch(err) {
      console.log(err?.response);
    }
  }

  return (
    <CXCard title="Sign Up" authform>
      <Form onSubmit={ handleSubmit }>
        {/* GROUP 1: USERNAME */}
        <Form.Group className="mb-3" controlId="username">
          <StyledLabel>Username</StyledLabel>
          <StyledInput
            type="text" 
            placeholder="Username"
            name="username"
            value={username}
            onChange={ handleTextChange }
            required 
          />
        </Form.Group>
        {/* GROUP 2: EMAIL */}
        <Form.Group className="mb-3" controlId="email">
          <StyledLabel>Email</StyledLabel>
          <StyledInput type="email" placeholder="Email" name="email" value={email} onChange={ handleTextChange } required />
        </Form.Group>

        {/* GROUP 3: PASSWORD */}
        <Form.Group className="mb-3" controlId="password">
          <StyledLabel>Password</StyledLabel>
          <StyledInput type="password" placeholder="Password" name="password" value={password} onChange={ handleTextChange } required />
        </Form.Group>

        {/* GROUP 4: PASSWORD CONFIRM */}
        <Form.Group className="mb-3" controlId="password-confirm">
          <StyledLabel>Password</StyledLabel>
          <StyledInput type="password" placeholder="Password Confirmation" ref={passwordConfirmRef} required />
        </Form.Group>

        {/* SUBMIT BUTTON */}
        <CXButton loadingState={loading}>
          {loading ? '...' : 'Submit'}
        </CXButton>
      </Form>
      <UserNav>
        Already a member? &nbsp; <Link to="/login">Login Here</Link>
      </UserNav>
    </CXCard>
  )
}

export default Signup