import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import modules
import styled from 'styled-components';
import { Container, Row, Col, Accordion } from 'react-bootstrap';

// Import custom components
import useAuth from '../../hooks/useAuth';
import currencyService from '../../services/currencyService';
import ErrorPage from '../../components/common/ErrorPage';
import Loader from '../../components/common/Loader';
import CXButton from '../../components/common/CXButton';
import CXNavLink from '../../components/common/CXNavLink';

const Styles = styled.div`
  .lead-heading {
    text-align: center;
    
      .title {
        font-size: 4em;
        font-weight: 700;
        margin-right: 0.8rem;
        color: var(--complementary);
      }
    
      .title-symbol {
        font-size: 1.5em;
        font-weight: 700;
        color: var(--brand);
      }
  }

  .admin-box {
    margin: 4rem 0;

    .grid-row {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(2, 1fr);
      align-items: center;
    }
  }

  .overview-box {
    padding: 6rem;
    margin: 4rem 0rem;
    background-color: var(--highlight-light);
    color: var(--complementary);

    .col > .container {
      background: var(--primary);
      border-radius: 5px;
      padding: 2rem;
    }  
  }
  
  .description-section {
    text-align: center;
    margin: 4rem auto;
    max-width: 70vw;

    .title {
      font-size: 2.5em;
      font-weight: 500;
      color: var(--complementary);
    }

    p {
      margin-top: 2rem;
      font-size: 1.2em;
    }
  }
`;

const PreviewImage = styled.img`
  margin-top: 1rem;
  width: 250px;
  padding: 1rem;
  border: 5px solid var(--brand);
  border-radius: 50%;
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
    <Styles>
      <Container>
        {/* HEADING SECTION */}
        <div className="lead-heading">
          <span className="title">{name}</span>
          <span className="title-symbol">{symbol}</span>
        </div>

        {/* ICON IMAGE SECTION */}
        <div className="text-center">
          {image && <PreviewImage src={image} alt="preview"/>}
        </div>

        {/* HIDDEN - ADMIN DROPDOWN SECTION*/}
        { user && <div className="admin-box">
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Admin Functions</Accordion.Header>
              <Accordion.Body>
                <Container>
                  <div className="p-2">
                    <p>Please navigate to the desired page to alter {name} item on the server</p>
                  </div>
                  <div className="grid-row">
                    {/* EDIT LINK */}
                    <CXNavLink to={`/currency/edit/${id}`} outline>Edit</CXNavLink>

                    {/* DELETE BUTTON */}
                    <CXButton onClick={handleDeleteClick} loadingState={loading}>{loading ? '...' : 'Delete'}</CXButton>
                  </div>
                </Container>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          </div>}
      </Container>

      {/* OVERVIEW SECTION */}
      <div className="overview-box">
        <Container>
          <Row>
            <Col>
              <Container>
                <h2>Current Price</h2>
                <p>{current_price}</p>
              </Container>
            </Col>
            <Col>
              <Container>
                <h2>Price Change</h2>
                <p>{price_change_percentage_24h}</p>
              </Container>
            </Col>
            <Col>
              <Container>
                <h2>Trading Status</h2>
                <p>{status}</p>
              </Container>
            </Col>
            <Col>
              <Container>
                <h2>Nation Currency</h2>
                <p>{nation}</p>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>

      {/* DESCRIPTION SECTION */}
      <Container>
        <div className="description-section">
          <span className="title">Information on {name}</span>
          <p>{description}</p>
        </div>
      </Container>
    </Styles>
  )
}

export default CurrencyDetail