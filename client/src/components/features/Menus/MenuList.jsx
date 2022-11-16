import React from 'react';
import styled from 'styled-components';

// Import local modules
import MenuItem from './MenuItem';
import { numSeparator, capitalizeFirstLetter } from '../../../utilities/readUtils';

const GridList = styled.div`
  margin: 2rem 0;

  .grid-static {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    margin-bottom: 1rem;

    background: var(--highlight-light);
    border: 0.1rem solid var(--highlight-light);
    border-radius: 10px;

    span {
      margin: auto;
      font-size: 1.1em;
      font-weight: 800;
      color: var(--highlight-super-dark);
    }

    .grid-item-left {
      margin-left: 1rem;
    }
  }

  .grid-coin {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(1, 1fr);

    & > div:nth-of-type(even) {
      background: var(--highlight-super-light);
      border-radius: 10px;
    }
  }
`;

const MenuList = (props) => {
  return (
    <GridList>
        <div className="grid-static">
          <span className="grid-item-left">{props.title}</span>
          <span>Buy Price</span>
          <span>24h</span>
          <span>Market Status</span>
          <span>&nbsp;</span>
        </div>
      <div className="grid-coin">
        { props.coins.map( coin => {
          return coin.nation ? 
          
            // CENTRALX API
            <MenuItem 
              key={coin.id}
              id={coin.id}
              name={coin.name}
              symbol={coin.symbol.toUpperCase()}
              price={numSeparator(coin.current_price.toFixed(2))}
              pricechange24h={coin.price_change_percentage_24h.toFixed(2)}
              mktstatus={capitalizeFirstLetter(coin.status)}
              description={coin.description}
              nation={coin.nation}
              image={coin.image}
            /> 
          :
            // COINGECKO API
            <MenuItem 
              key={coin.id}
              id={coin.id}
              name={coin.name}
              symbol={coin.symbol.toUpperCase()}
              price={numSeparator(coin.current_price.toFixed(2))}
              pricechange24h={coin.price_change_percentage_24h.toFixed(2)}
              mktstatus={numSeparator(coin.market_cap)}
              description={coin.description}
              nation={null}
              image={coin.image}             
            />
        })}
      </div>
    </GridList>
  )
}

export default MenuList