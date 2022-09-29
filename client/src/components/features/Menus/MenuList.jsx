import React, { Fragment } from 'react';

// Custom components
import MenuItem from './MenuItem';

// External packages
import { Table } from 'react-bootstrap';
import styled from 'styled-components';

const StyledTable = styled(Table)`
  border: 5px solid var(--complementary);

  thead {
    background: var(--complementary);
    color: var(--primary);
    padding: 2rem 0;
  }

  .button-col {
    width: 150px;
  }
`;

const MenuList = (props) => {
  // Function using Regex to pass commas into long digits
  function numSeparator(number) {
    let str = number.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return  "$ " + str.join(".");
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Fragment>
      <StyledTable striped hover>
        <thead>
          <tr>
            <th>{props.title}</th>
            <th className="text-center">Buy Price</th>
            <th className="text-center">24h</th>
            <th className="text-center">Market Worth</th>
            <th className="button-col"></th>
          </tr>
        </thead>
        <tbody>
          { props.coins.map(( coin ) => (
            <MenuItem 
              key={coin.id}
              id={coin.id}
              name={coin.name}
              symbol={coin.symbol.toUpperCase()}
              price={numSeparator(coin.current_price.toFixed(2))}
              pricechange24h={coin.price_change_percentage_24h.toFixed(2)}
              mktstatus={coin.status ? capitalizeFirstLetter(coin.status) : numSeparator(coin.market_cap)}
              description={coin.description ? coin.description : ""}
              nation={coin.nation ? coin.nation : ""}
              image={coin.image}
            />
          )) }
        </tbody>
      </StyledTable>
    </Fragment>
  )
}

export default MenuList