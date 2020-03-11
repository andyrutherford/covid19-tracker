import React from 'react';
import Moment from 'react-moment';

const Navbar = ({ title, lastUpdated }) => {
  return (
    <div className='navbar bg-primary'>
      <h1>
        <a href='/'>{title}</a>
      </h1>
      {lastUpdated && (
        <p>
          Last updated <Moment local>{lastUpdated}</Moment>{' '}
        </p>
      )}
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
