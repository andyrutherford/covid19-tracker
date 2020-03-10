import React, { Fragment, useContext, useEffect } from 'react';

const Navbar = ({ title }) => {
  return (
    <div className='navbar bg-primary'>
      <h1>
        <a href='/'>{title}</a>
      </h1>
      <ul>
        {' '}
        <li>
          <a href='#!'>Home</a>
        </li>
      </ul>
    </div>
  );
};

Navbar.defaultProps = {
  title: 'nCov2020'
};

export default Navbar;
