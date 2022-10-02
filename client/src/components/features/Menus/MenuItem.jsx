import React from 'react';
import styled from 'styled-components';
import CXNavLink from '../../common/CXNavLink';

const Styles = styled.div`
  .grid-row {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
  
    border: 0.1rem solid var(--highlight-light);
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
    padding: 1rem;
    transition: all 0.3s ease;
  
    &:hover {
      transform: scale(1.008);
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      cursor: pointer;
      background-color: var(--brand-light);
      color: var(--primary);
    }
    
    .grid-description {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.8rem;
      align-items: center;
      justify-content: space-around;
      padding-left: 1rem;
  
      img {
        max-width: 60px;
      }
  
      .coin-symbol {
        color: var(--highlight-dark);
        font-size: 0.8em;
        font-weight: bold;
      }
    }
  }
`;

// const StyledLink = styled(Link)`
//   margin: 0 2rem;
//   min-width: 100px;
//   font-size: 0.9rem;
// `;

const ColorChange = styled.div`
  color: ${
    (props) => props.data < 0 ? "var(--error)" : "var(--success)"
  };
`;

const MenuItem = (props) => {
  return (
    <Styles>
      <div className="grid-row">
        {/* Section 1: Icon, Coin Name & Shorthand */}
        <div className="grid-description">
          <img src={props.image} alt={props.name} />
          <span>{props.name}</span>
          <span className="coin-symbol">{props.symbol}</span>
        </div>

        {/* Section 2: Buy Price */}
        <div className="text-center">
          {props.price}
        </div>

        {/* Section 3: Price Change (24hr) */}
        <div className="text-center" >
          <ColorChange data={props.pricechange24h}>
            {props.pricechange24h}&nbsp;%
          </ColorChange>
        </div>

        {/* Section 4: Market Cap */}
        <div className="text-center">
          {props.mktstatus}
        </div>

        {/* Section 5: Link to Details */}
        <CXNavLink 
          to={`/currency/${props.id}`}
          outline
        >
          Buy {props.symbol}
        </CXNavLink>
      </div>
    </Styles>
  )
}

export default MenuItem