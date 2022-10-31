import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import styled from 'styled-components';

// Import custom modules
import currencyService from '../../services/currencyService';
import { getFileFromUrl } from '../../utilities/writeUtils';
import ErrorPage from '../../components/common/ErrorPage';
import Loader from '../../components/common/Loader';
import CXButton from '../../components/common/CXButton';
import CXCard from '../../components/common/CXCard';

// Custom Styles
const PreviewImage = styled.img`
  margin-top: 1rem;
  width: 250px;
  padding: 1rem;
  border: 5px solid var(--brand);
  border-radius: 50%;
  opacity: 0.8;
`;

const EditCurrency = () => {
  // REACT-ROUTER DOM HOOKS
  const params = useParams();
  const navigate = useNavigate();

  // HOOK: SETTING COMPONENT STATE (& init values)
  const [currencyData, setCurrencyData] = useState({
    id: params.id,
    name: "",
    symbol: "",
    current_price: 0,
    price_change_percentage_24h: 0,
    status: "pending",
    description: "",
    nation: "",
    image: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Uploaded File from Existing downloadURL
  const [uploadedFile, setUploadedFile] = useState("");
  const [preview, setPreview] = useState(true);

  // Destructure data state nested object properties
  const { id, name, symbol, current_price, price_change_percentage_24h, description, nation, status, image } = currencyData;

  // HOOK: Re-mount Request Prevention (React18)
  const effectRan = useRef(false);

  // HOOK: ON-LOAD SIDE EFFECTS
  useEffect(() => {
    if (effectRan.current === false) {
      fetchCurrency();
      setLoading(false);

      // CLEAN UP FUNCTION
      return () => {
        effectRan.current = true;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); 

  // FORM FUNCTIONS
  // [0] FORM PRE-POPULATION CALL
  async function fetchCurrency() {
    try {
      const response = await currencyService.getById(id);
      const fetchedCurrency = await response.data;
      console.log(fetchedCurrency);

      // Using the spread, we OVERWRITE our initial object with the new data!
      setCurrencyData(currencyData => ({...currencyData,...fetchedCurrency}));

      // Save uploaded file glob to state
      if (!fetchedCurrency.image) {      
        console.log('No downloadURL provided by DB'); 
      } else {
        const fileGlob = getFileFromUrl(fetchedCurrency.image);
        setUploadedFile(fileGlob);
      }

    } catch(err) {
      console.log(err?.response);
      setError(true); 
    }
  }

  // [1] CHANGE STATE FOR TEXT FORM DATA
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setCurrencyData({
      ...currencyData,            
      [name]: value       
    });
  }

  // [2] CHANGE STATE FOR FILE FORM DATA
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCurrencyData({
      ...currencyData, 
      image: file
    });
    setPreview(false);
  }

  // [3] FORM SUBMISSION FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();      
    setLoading(true);
    try {
      // NOTE: We add uploadedFile parameter to pass image glob
      const response = await currencyService.put(id, currencyData, uploadedFile);
      console.log(response);
      navigate('/currency/prices');

    } catch (err) {
      console.log(err?.response);
      setError(true); 
      window.scroll({top: 0, left: 0, behavior: 'smooth' });
    }
    setLoading(false);
  };

  // CONDITIONAL LOAD: ERROR
  if (error) {
    return (
      <Container className="text-center">
        <ErrorPage />
      </Container>
    )
  }

  // CONDITIONAL LOAD: LOADING
  if (loading) {
    return (
      <Container>
        <Loader />
      </Container>
    )
  }

  // DEFAULT LOAD: SUCCESS PRE-POPULATION API CALL
  return (
    <CXCard title="Edit Currency">
      {/* FORM SECTION */}
      <Form onSubmit={ handleSubmit }>
        {/* GROUP 1: NAME */}
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Central Bank Digital Currency Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter CBDC Name" 
            name="name"
            value={name}
            onChange={ handleTextChange }
          />
        </Form.Group>

        {/* GROUP 2: SYMBOL */}
        <Form.Group controlId="symbol" className="mb-3">
          <Form.Label>CBDC Symbol</Form.Label>
          <Form.Control type="text" placeholder="Enter CBDC Symbol" name="symbol" value={symbol} onChange={ handleTextChange } />
        </Form.Group>

        {/* GROUP 3: PRICE INFORMATION */}
        <Form.Group className="mb-3">
          <Row>
            {/* 3A: CURRENT PRICE */}
            <Col lg={6} md={6} sm={12}>
              <Form.Label>Current CBDC Price</Form.Label>
              <InputGroup>          
                <InputGroup.Text id="price-dollar">$</InputGroup.Text>
                <Form.Control type="number" aria-describedby="price-dollar" id="price-input" name="current_price" value={current_price} onChange={ handleTextChange } />
              </InputGroup>
            </Col>

            {/* 3B: PRICE CHANGE 24HR */}
            <Col lg={6} md={6} sm={12}>
              <Form.Label>24HR Price Change</Form.Label>
              <InputGroup>          
                <Form.Control type="number" aria-describedby="price-percent" id="price-percent" name="price_change_percentage_24h" value={price_change_percentage_24h} onChange={ handleTextChange } />
                <InputGroup.Text id="price-percent">%</InputGroup.Text>
              </InputGroup>
            </Col>
          </Row>
        </Form.Group>

        {/* GROUP 4: DESCRIPTION */}
        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Description of New CBDC</Form.Label>
          <Form.Control as="textarea" type="text" placeholder="Enter description of CBDC" name="description" value={description} onChange={ handleTextChange } />
        </Form.Group>

        {/* GROUP 5: NATION */}
        <Form.Group controlId="nation" className="mb-3">
          <Form.Label>Nation of Reserve Bank for DC</Form.Label>
          <Form.Control type="text" placeholder="Enter nation of the CBDC" name="nation" value={nation} onChange={ handleTextChange } />
        </Form.Group>

        {/* GROUP 6: CBDC STATUS */}
        <Form.Group controlId="status" className="mb-3">
          <Form.Label>CBDC Status</Form.Label>
          <Form.Control 
            as='select'
            name='status'
            value={status}
            onChange={ handleTextChange }
          >
            <option value="pending">Pending</option>
            <option value="tradeable">Tradeable</option>
            <option value="non-tradeable">Non-Tradeable</option>
          </Form.Control>
        </Form.Group>

        {/* GROUP 7A: CONDITIONAL PREVIEW OF IMAGE (File in DB) */}
        { preview && !loading ? 
          <div className="text-center mt-2 mb-5">
            <h6>Current Image</h6>
            <PreviewImage src={image} alt="preview"/>
          </div>
          : null 
        }
  
        {/* GROUP 7B: IMAGE */}
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>New CBDC Image</Form.Label>
          <Form.Control 
            type="file"
            className="mb-4"
            onChange={ handleFileChange }
          />
        </Form.Group>

        {/* SUBMIT BUTTON */}
        <CXButton loadingState={loading}>
          {loading ? '...' : 'Submit'}
        </CXButton>
      </Form>
    </CXCard>
  )
}

export default EditCurrency