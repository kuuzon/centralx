import React from 'react';
import { Link } from 'react-router-dom';

const Navlink = ({ href, children }) => {
  return (
    <Link to={href}>
      {children}
    </Link>
  )
}

export default Navlink