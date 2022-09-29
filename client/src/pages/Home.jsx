// Import React modules
import React from 'react';

// Import npm packages
import Container from 'react-bootstrap/Container';

// Import custom components
import HeroBox from '../components/common/HeroBox';

const Home = () => {
  return (
    <Container>
      <HeroBox 
        title="Welcome to CentralX"
        content="Where Crypto meets the Centralised Economy"
        button="Start Trading"
      />
    </Container>
  )
}

export default Home