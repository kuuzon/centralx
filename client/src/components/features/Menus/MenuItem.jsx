import React from 'react';

// External packages
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TableRow = styled.tr`
  margin: 1rem 0%;

  td {
    padding: 1rem;
    vertical-align: middle;
    font-size: 0.9rem;

    img {
      max-width: 40px;
    }
    
    p {
      display: inline;
      vertical-align: middle;
      font-size: 1.2rem;
      font-weight: bold;
      margin-left: 1rem;
    }

    span {
      vertical-align: -10%;
      color: var(--highlight-dark);
      font-size: 0.7rem;
      font-weight: bold;
      margin-left: 0.4rem;
    }
  }
`;

const StyledLink = styled(Link)`
  min-width: 100px;
  font-size: 0.9rem;
`;

const ColorChange = styled.div`
  color: ${
    (props) => props.data < 0 ? "var(--error)" : "var(--success)"
  };
`;

const MenuItem = (props) => {
  return (
    <TableRow>
      {/* Column 1: Icon, Coin Name & Shorthand */}
      <td>
        <img src={props.image} alt={props.name} />
        <p>{props.name}</p>
        <span>&#40; {props.symbol} &#41;</span>
      </td>

      {/* Column 2: Buy Price */}
      <td className="text-center">
        {props.price}
      </td>

      {/* Column 3: Price Change (24hr) */}
      <td className="text-center" >
        <ColorChange data={props.pricechange24h}>
          {props.pricechange24h} %
        </ColorChange>
      </td>

      {/* Column 4: Market Cap */}
      <td className="text-center">
        {props.mktstatus}
      </td>

      {/* Column 5: Link to Details */}
      <td>
        <StyledLink 
          className="btn btn-outline-dark"
          to={`/currency/${props.id}`}
        >
          Buy {props.symbol}
        </StyledLink>
      </td>
    </TableRow>
  )
}

export default MenuItem