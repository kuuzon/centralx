import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import modules
import styled from 'styled-components';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';

// Import custom modules
import currencyService from '../../services/currencyService';
import ErrorPage from '../../components/common/ErrorPage';
import Loader from '../../components/common/Loader';

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
  // Dynamic File Label
  const [fileName, setFileName] = useState('Choose File');
  // File Path of Existing downloadURL (for potential deletion)
  const [filePath, setFilePath] = useState('');
  const [preview, setPreview] = useState(true);

  // Destructure data state nested object properties
  const { id, name, symbol, current_price, price_change_percentage_24h, description, nation, status, image } = currencyData;

  // HOOK: ON-LOAD SIDE EFFECTS
  useEffect(() => {
    // [0] Pre-population fetch currency function (based on id)
    async function fetchCurrency() {
      try {
        const response = await currencyService.getById(id);
        const fetchedCurrency = await response.data;
        console.log(fetchedCurrency);

        // Using the spread, we OVERWRITE our initial object with the new data!
        setCurrencyData(currencyData => ({...currencyData,...fetchedCurrency}));

        // Set file name value to foodImage stem
        if (!fetchedCurrency.image) {      
          console.log('No downloadURL provided by DB'); 
          setFileName('Choose File');
        } else {
          const existingFileName = currencyService.getFilePathFromUrl(fetchedCurrency.image);
          setFileName(existingFileName);
          setFilePath(existingFileName);
        }
        // Success Message:
        setLoading(false);

      } catch (err) {
        console.log(err?.response);
        setError(true); 
      }
    }
    fetchCurrency();
  }, [id]);

  // FORM FUNCTIONS
  // [1] handleTextChange will handle change in state value event for TEXT data
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setCurrencyData({
      ...currencyData,             // Spread/copy the object to prevent it being overwritten by new state
      [name]: value        // Overwrite the values of the fields (which match the "name" attribute) to update
    });
  }

  // [2] handleFileChange will handle change in state for the file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCurrencyData({
      ...currencyData, image: file
    });
    setFileName(file.name);
    setPreview(false);
  }

  // [3] handleSubmit will control button event
  const handleSubmit = async (e) => {
    e.preventDefault();      
    setLoading(true);
    try {
      // NOTE: We add filePath parameter to pass downloadURL
      const response = await currencyService.put(id, currencyData, filePath);
      console.log(response);
      navigate('/currency/prices');

    } catch (err) {
      console.log(err?.response);
      setError(true); 
      window.scroll({top: 420, left: 0, behavior: 'smooth' });
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
    <Container>
      <h2>Edit Currency: {name}</h2>

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
            minLength="3"
            onChange={ handleTextChange }
          />
        </Form.Group>

        {/* GROUP 2: SYMBOL */}
        <Form.Group controlId="symbol" className="mb-3">
          <Form.Label>CBDC Symbol</Form.Label>
          <Form.Control type="text" placeholder="Enter CBDC Symbol Name - only THREE letters" name="symbol" value={symbol} minLength="3" onChange={ handleTextChange } />
        </Form.Group>

        {/* GROUP 3: PRICE INFORMATION */}
        <Form.Group className="mb-3">
          <Row>
            {/* 3A: CURRENT PRICE */}
            <Col lg={6} md={6} sm={12}>
              <Form.Label>Current CBDC Price</Form.Label>
              <InputGroup>          
                <InputGroup.Text id="price-dollar">$</InputGroup.Text>
                <Form.Control type="number" aria-describedby="price-dollar" id="price-input" name="current_price" value={current_price} minLength="3" onChange={ handleTextChange } />
              </InputGroup>
            </Col>

            {/* 3B: PRICE CHANGE 24HR */}
            <Col lg={6} md={6} sm={12}>
              <Form.Label>24HR Price Change</Form.Label>
              <InputGroup>          
                <Form.Control type="number" aria-describedby="price-percent" id="price-percent" name="price_change_percentage_24h" value={price_change_percentage_24h} minLength="3" onChange={ handleTextChange } />
                <InputGroup.Text id="price-percent">%</InputGroup.Text>
              </InputGroup>
            </Col>
          </Row>
        </Form.Group>

        {/* GROUP 4: DESCRIPTION */}
        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Description of New CBDC</Form.Label>
          <Form.Control type="text" placeholder="Enter description of CBDC" name="description" value={description} minLength="3" onChange={ handleTextChange } />
        </Form.Group>

        {/* GROUP 5: NATION */}
        <Form.Group controlId="nation" className="mb-3">
          <Form.Label>Nation of Reserve Bank for DC</Form.Label>
          <Form.Control type="text" placeholder="Enter nation of the CBDC" name="nation" value={nation} minLength="3" onChange={ handleTextChange } />
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
            label={fileName}
            className="mb-4"
            onChange={ handleFileChange }
          />
        </Form.Group>

        {/* SUBMIT BUTTON */}
        <Button variant="primary" type="submit" className={loading ? "button-gradient-loading btn-block" : "btn-block"} disabled={loading}>
          {loading ? '...' : 'Submit'}
        </Button>
      </Form>
    </Container>
  )
}

export default EditCurrency