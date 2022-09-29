import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

// Import modules
import styled from 'styled-components';
import { Container, Row, Col, Button } from 'react-bootstrap';

// Import custom components
import useAuth from '../../hooks/useAuth';
import currencyService from '../../services/currencyService';
import ErrorPage from '../../components/common/ErrorPage';
import Loader from '../../components/common/Loader';

const HeroBox = styled.div`
  padding: 2rem;
  margin-top: 2rem;
  margin-bottom: 4rem;
  background-color: #343a40;
  color: white;
  border-radius: 1rem 1rem 1rem 1rem;
`;

const CurrencyDetail = ( props ) => {
  // HOOK: CONTEXT FOR AUTH
  const { user } = useAuth();

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

  // Destructure data state nested object properties & instance of useNavigate class (NOTE IMAGE DESTRUCTURED)
  const { id, name, symbol, current_price, price_change_percentage_24h, status, description, nation, image } = currencyData;

  // HOOK: ON-LOAD SIDE EFFECTS
  useEffect(() => {
    // [0] Pre-population fetch currency function (based on id)
    async function fetchCurrency() {
      try {
        const response = await currencyService.getById(id);
        const fetchedCurrency = await response.data
        console.log(fetchedCurrency);

        // Using the spread, we OVERWRITE our initial object with the new data!
        // NOTE: We could just do setData({...currencyData, ...fetchedCurrency}), but the dependency array then has issues!
        // NOTE: Specifically, we pass a function that has a first param (currencyData) same as the current value of the state, and we set it to state we want in the return of the function!
        setCurrencyData(currencyData => ({...currencyData,...fetchedCurrency}));

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
  // [1] handleDeleteClick
  const handleDeleteClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Call API - must match server route + pass id to route
      const response = await currencyService.del(id);
      console.log(response);

      // onSuccess - Redirect
      setLoading(false);
      navigate('/currency/prices');
      
    } catch (err) {
      console.log(err?.response);
      setError(true);
      window.scroll({top: 0, left: 0, behavior: 'smooth' });
    }
  }

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
      <div className="title-header text-center mt-4 mb-4">
        <h2>{name}</h2>
      </div>

      {/* CONTAINER 1: CURRENCY DESCRIPTION */}
      <HeroBox>
        <Container>
          <Row>
            <Col>
              <h2>{name}</h2>
              <p>{description}</p>
            </Col>
            <Col>
              {image ? 
                <img className="image-splash" src={image} alt={name}></img> 
                :
                <p>
                  No Image Uploaded - Edit Image Here: 
                  <Link to={`/currency/edit/${id}`}>{name}</Link>
                </p>
              }
            </Col>
          </Row>
        </Container>
      </HeroBox>

      {/* CONTAINER 3: Admin Buttons*/}
      { user ? 
        <HeroBox>
          <Container>
            <Row>
              <Col>
                <h4>Admin Functions</h4>
                <p>Please navigate to the desired page to alter {name} item on the server and database.</p>
              </Col>
            </Row>
            <Row className="mt-4">
              {/* EDIT BUTTON */}
              <Col>
                <Button className="w-100" as={Link} to={`/currency/edit/${id}`} variant="primary">Edit</Button>
              </Col>

              {/* DELETE BUTTON */}
              <Col>
                <Button 
                  variant="danger" 
                  className={loading ? "button-gradient-loading btn-block" : "btn-block"}
                  disabled={loading}
                  onClick={ handleDeleteClick }
                >
                  {loading 
                    ? '...'
                    : 'Delete'
                  }
                </Button>
              </Col>
            </Row>
          </Container>
        </HeroBox>
      : null }
    </Container>
  )
}

export default CurrencyDetail