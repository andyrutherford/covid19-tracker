import React, { useState } from 'react';
import Rodal from 'rodal';
import Moment from 'react-moment';

import 'rodal/lib/rodal.css';

const Navbar = ({ title, lastUpdated }) => {
  const [showModal, setShowModal] = useState(false);

  const onShowModal = () => {
    setShowModal(true);
  };

  const onHideModal = () => {
    setShowModal(false);
  };

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
          <button onClick={onShowModal}>show</button>

          <Rodal visible={showModal} onClose={onHideModal}>
            <div className='modal'>Content</div>
          </Rodal>
        </li>
      </ul>
    </div>
  );
};

Navbar.defaultProps = {
  title: 'nCov2020'
};

export default Navbar;
