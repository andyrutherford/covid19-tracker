import React from 'react';
import Moment from 'react-moment';

const Navbar = ({ title, lastUpdated }) => {
  return (
    <div className='navbar bg-primary'>
      <div>
        <h2>
          <a href='/'>{title}</a>
        </h2>
        {lastUpdated && (
          <p className='navbar-subtext small'>
            Last updated <Moment local>{lastUpdated}</Moment>{' '}
          </p>
        )}
      </div>
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
