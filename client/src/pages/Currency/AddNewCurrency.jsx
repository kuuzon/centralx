import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import modules
import { Form } from 'react-bootstrap';

// Import custom modules
import currencyService from '../../services/currencyService';
import CXInput from '../../components/common/Form/CXInput';
import CXInputGroup from '../../components/common/Form/CXInputGroup';
import CXTextarea from '../../components/common/Form/CXTextarea'
import CXSelect from '../../components/common/Form/CXSelect';
import CXFile from '../../components/common/Form/CXFile';
import CXButton from '../../components/common/CXButton';
import CXCard from '../../components/common/CXCard';

const AddCurrency = () => {
  // HOOK: SETTING COMPONENT STATE (& init values)
  const [currencyData, setCurrencyData] = useState({
    name: "",
    symbol: "",
    current_price: 0,
    price_change_percentage_24h: 0,
    status: "pending",
    description: "",
    nation: "",
    image: ""
  });
  const [loading, setLoading] = useState(false);
  // Dynamic File Label
  const [fileName, setFileName] = useState('Choose File');

  const options = [
    { _id: "pending", name: "Pending" },
    { _id: "tradeable", name: "Tradeable" },
    { _id: "non-tradeable", name: "Non-Tradeable" },
  ];

  // Destructure data state nested object properties & instance of useNavigate class
  const { name, symbol, current_price, price_change_percentage_24h, status, description, nation } = currencyData;
  const navigate = useNavigate();

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
      ...currencyData, 
      image: file
    });
    setFileName(file.name);
  }

  // [3] handleSubmit will control button event
  const handleSubmit = async (e) => {
    e.preventDefault();      
    setLoading(true);
    try {
      // API Post (refactored)
      const response = await currencyService.post(currencyData);
      console.log(response);
      navigate('/currency/prices');

    } catch (err) {
      console.log(err?.response);
      window.scroll({top: 420, left: 0, behavior: 'smooth' });
    }
    setLoading(false);
  };

  return (
    <CXCard title="Add Currency">
      {/* FORM SECTION */}
      <Form onSubmit={ handleSubmit }>
        {/* GROUP 1: NAME */}
        <CXInput 
          name="name"
          label="CBDC Name"
          type="text"
          value={name}
          onChange={handleTextChange}
        />

        {/* GROUP 2: SYMBOL */}
        <CXInput 
          name="symbol"
          label="CBDC Symbol Code"
          type="text"
          value={symbol}
          onChange={handleTextChange}
        />

        {/* GROUP 3: PRICE INFORMATION */}
        {/* 3A: CURRENT PRICE */}
        <CXInputGroup 
          name="current_price"
          label="Current CBDC Price"
          denom="$"
          type="number"
          value={current_price}
          onChange={handleTextChange}
        />

        {/* 3B: PRICE CHANGE 24HR */}
        <CXInput 
          name="price_change_percentage_24h"
          label="24HR Price Change"
          type="number"
          value={price_change_percentage_24h}
          onChange={handleTextChange}
        />

        {/* GROUP 4: CBDC STATUS */}
        <CXSelect
          name="status"
          label="CDBC Status"
          value={status}
          items={options}
          onChange={handleTextChange}
        />

        {/* GROUP 5: DESCRIPTION */}
        <CXTextarea 
          name="description"
          label="Description of CBDC"
          value={description}
          onChange={ handleTextChange }
        />

        {/* GROUP 6: NATION */}
        <CXInput 
          name="nation"
          label="Nation of CDBC"
          type="text"
          value={nation}
          onChange={handleTextChange}
        />

        {/* GROUP 7: IMAGE */}
        <CXFile 
          label="CDBC Image"
          onChange={handleFileChange}
        />

        {/* SUBMIT BUTTON */}
        <CXButton loadingState={loading}>
          {loading ? '...' : 'Submit'}
        </CXButton>
      </Form>
    </CXCard>
  )
}

export default AddCurrency