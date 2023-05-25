import React from 'react';
import { Link } from 'react-router-dom';

function NavItem(props:any) {
  const {
    verb,
    link
  } = props

  return (
    <div>
      <Link to={link}>{verb}</Link>
    </div>
  )
}

export default NavItem;
