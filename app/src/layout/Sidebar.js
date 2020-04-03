import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default props => {
  return (
    <Menu>
      <a className='menu-item medium' href='#top'>
        <div className='grid-2-sidebar'>
          <div>
            <i className='fas fa-home'></i>
          </div>
          <div> Home</div>
        </div>
      </a>

      <a className='menu-item medium' href='#map'>
        {' '}
        <div className='grid-2-sidebar'>
          {' '}
          <div>
            <i className='fas fa-map-marked-alt'></i>
          </div>{' '}
          <div>Map</div>
        </div>
      </a>

      <a className='menu-item medium' href='#confirmed-cases'>
        {' '}
        <div className='grid-2-sidebar'>
          {' '}
          <div>
            <i className='fas fa-head-side-cough'></i>
          </div>{' '}
          <div>Confirmed Cases</div>
        </div>
      </a>

      <a className='menu-item medium' href='#deaths'>
        {' '}
        <div className='grid-2-sidebar'>
          {' '}
          <div>
            <i className='fas fa-skull-crossbones'></i>{' '}
          </div>{' '}
          <div>Deaths</div>
        </div>
      </a>

      <a className='menu-item medium' href='#tweets'>
        {' '}
        <div className='grid-2-sidebar'>
          {' '}
          <div>
            <i className='fab fa-twitter'></i>{' '}
          </div>{' '}
          <div>Latest Tweets</div>
        </div>
      </a>

      <a className='menu-item medium' href='#timeline'>
        {' '}
        <div className='grid-2-sidebar'>
          {' '}
          <div>
            <i className='far fa-newspaper'></i>{' '}
          </div>{' '}
          <div>Timeline</div>
        </div>
      </a>

      <a className='menu-item medium' href='#demographics'>
        {' '}
        <div className='grid-2-sidebar'>
          {' '}
          <div>
            <i className='fas fa-users'></i>{' '}
          </div>{' '}
          <div>Demographics</div>
        </div>
      </a>
    </Menu>
  );
};
