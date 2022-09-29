import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  /* GRID STYLING */
  .spinner-box {
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
  }

  /* X-ROTATING BOXES */
  .configure-border-1 {
    width: 115px;
    height: 115px;
    padding: 3px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--complementary);
    animation: configure-clockwise 3s ease-in-out 0s infinite alternate;
  }

  .configure-border-2 {
    width: 115px;
    height: 115px;
    padding: 3px;
    left: -115px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--brand);
    transform: rotate(45deg);
    animation: configure-xclockwise 3s ease-in-out 0s infinite alternate;
  }

  .configure-core {
    width: 100%;
    height: 100%;
    background-color: var(--primary);
  }

  /* KEYFRAMES */
  @keyframes configure-clockwise {
    0% {
      transform: rotate(0);
    }
    25% {
      transform: rotate(90deg);
    }
    50% {
      transform: rotate(180deg);
    }
    75% {
      transform: rotate(270deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes configure-xclockwise {
    0% {
      transform: rotate(45deg);
    }
    25% {
      transform: rotate(-45deg);
    }
    50% {
      transform: rotate(-135deg);
    }
    75% {
      transform: rotate(-225deg);
    }
    100% {
      transform: rotate(-315deg);
    }
  }
`;

// CODEPEN: Great source of inspiration and code for spinners (EXAMPLE: https://codepen.io/AlexWarnes/pen/jXYYKL)
// BOOTSTRAP: Has a standard repo of spinners for easy use (https://react-bootstrap.github.io/components/spinners/)
const Loader = () => {
  return (
    <Styles>
      <div className="spinner-box">
        <div className="configure-border-1">  
          <div className="configure-core"></div>
        </div>  
        <div className="configure-border-2">
          <div className="configure-core"></div>
        </div> 
      </div>
    </Styles>
  )
}

export default Loader