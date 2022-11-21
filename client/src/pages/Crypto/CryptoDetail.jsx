import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

// Import modules
import styled from 'styled-components';
import { Container } from 'react-bootstrap';

// Import custom components
import cgService from '../../services/cgService';
import ErrorPage from '../../components/common/ErrorPage';
import Loader from '../../components/common/Loader';

const Styles = styled.div`
  .lead-heading {
    text-align: center;
    
    .title {
      font-size: 4em;
      font-weight: 700;
      margin-right: 0.8rem;
    }
  
    .title-symbol {
      font-size: 1.5em;
      font-weight: 700;
      color: var(--brand);
    }
  }
  
  .description-section {
    text-align: center;
    margin: 4rem auto;
    max-width: 70vw;

    .title {
      font-size: 2.5em;
      font-weight: 500;
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

const CryptoDetail = () => {
  // REACT-ROUTER DOM HOOKS
  const params = useParams();

  // HOOK: SETTING COMPONENT STATE (& init values)
  const [cryptoData, setCryptoData] = useState({
    id: params.id,
    name: "",
    symbol: "",
    description: "",
    image: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Destructure data state nested object properties & instance of useNavigate class (NOTE IMAGE DESTRUCTURED)
  const { id, name, symbol, description, image } = cryptoData;

  // SET INNER HTML DUE TO ANCHOR TAGS: https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
  const htmlDescription = {
    __html: description.en
  }

  // HOOK: Prevention of useEffect calling TWICE (React v18)
  const effectRan = useRef(false);

  // HOOK: ON-LOAD SIDE EFFECTS
  useEffect(() => {
    console.log("Effect Ran");
    if (effectRan.current === false) {
      fetchCrypto();
      setLoading(false);

      // CLEAN UP FUNCTION
      return () => {
        console.log("Unmounted");
        effectRan.current = true;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // FUNCTIONS
  // [1] PAGE POPULATION
  async function fetchCrypto() {
    try {
      const response = await cgService.getById(id);
      const fetchedCrypto = await response.data
      console.log(fetchedCrypto);

      setCryptoData(cryptoData => ({...cryptoData,...fetchedCrypto}));

    } catch (err) {
      setError(true);
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
          <span className="title-symbol">{symbol.toUpperCase()}</span>
        </div>

        {/* ICON IMAGE SECTION */}
        <div className="text-center">
          {image && <PreviewImage src={image.large} alt="preview"/>}
        </div>
      </Container>

      {/* DESCRIPTION SECTION */}
      <Container>
        <div className="description-section">
          <span className="title">Information on {name}</span>
          <p dangerouslySetInnerHTML={htmlDescription}></p>
        </div>
      </Container>
    </Styles>
  )
}

export default CryptoDetail