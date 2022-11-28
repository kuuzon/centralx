import React, { useState, useEffect, useRef } from 'react';
import useAuth from '../../hooks/useAuth';

// Import npm packages
import { Container } from 'react-bootstrap';
import CXNavLink from '../../components/common/CXNavLink';

// Import components
import currencyService from '../../services/currencyService';
import MenuList from '../../components/features/Menus/MenuList';
import Loader from '../../components/common/Loader';
import ErrorPage from '../../components/common/ErrorPage';

const CurrencyMenu = () => {
  // HOOK: CONTEXT FOR AUTH
  const { user } = useAuth();

  // HOOK: SETTING COMPONENT STATE (& init values)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // HOOK: Prevention of useEffect calling TWICE (React v18)
  const effectRan = useRef(false);

  // HOOK: ON-LOAD SIDE EFFECTS
  useEffect(() => {
    console.log("Effect Ran");
    if (effectRan.current === false) {
      fetchCurrency();
      setLoading(false);

      // CLEAN UP FUNCTION
      return () => {
        console.log("Unmounted");
        effectRan.current = true;
      }
    }
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
      if(err.response.status === 500) {
        setError(true); 
      } else {
        setError(false);
      }
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
      <h1>Digital Currencies Information</h1>
      <p>CentralX is bridging the gap between physical and digital fiat currencies - join the new age and grasp your national currency in your digital wallet, today!</p>

      {/* ADMIN SECTION: AUTHORISATION REQUIRED */}
      { user && <div className="admin-section text-center mt-4">
        <CXNavLink to="/currency/add">Add Currency</CXNavLink>
      </div>}

      {/* Currency Menu */}
      {data.length > 0 && <MenuList title="Digital Currencies (RBDCs)" coins={data} />}
    </Container>
  )
}

export default CurrencyMenu