import React, { useState, useEffect } from 'react';

// Import npm packages
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// Import child components
import currencyService from '../../services/currencyService';
import MenuList from '../../components/features/Menus/MenuList';
import ErrorPage from '../../components/common/ErrorPage';
import Loader from '../../components/common/Loader';

const CurrencyMenu = () => {
  // HOOK: SETTING COMPONENT STATE (& init values)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // HOOK: ON-LOAD SIDE EFFECTS
  useEffect(() => {
    fetchCurrency();
    setLoading(false);
  }, []);

  // COMPONENT FUNCTIONS
  async function fetchCurrency() {
    try {
      // API Request (refactored)
      const response = await currencyService.get();
      const data = await response.data;
      setData(data);
    } catch(err) {
      console.log(err?.response);
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

  // DEFAULT LOAD: SUCCESS API CALL
  return (
    <Container>
      <p>Currencies</p>
      <Link to="/currency/add">Add Currency</Link>

      {/* Currency Menu */}
      {data.length > 0 && <MenuList title="Digital Currencies (RBDCs)" coins={data} />}
    </Container>
  )
}

export default CurrencyMenu