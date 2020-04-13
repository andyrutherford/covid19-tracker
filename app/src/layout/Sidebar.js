import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default (props) => {
  return (
    <Menu>
      <a className='menu-item medium' href='#top'>
        <div className='grid-2-sidebar'>
          <div>
            <i className='fas fa-home'></i>
          </div>
          <div> Top</div>
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

      <a className='menu-item medium' href='#tweets'>
        {' '}
        <div className='grid-2-sidebar'>
          {' '}
          <div>
            <i className='fab fa-twitter'></i>{' '}
          </div>{' '}
          <div>WHO</div>
        </div>
      </a>

      <a className='menu-item medium' href='#worldwide-infections'>
        {' '}
        <div className='grid-2-sidebar'>
          <div>
            <i className='fas fa-globe'></i>
          </div>{' '}
          <div>Worldwide Infections</div>
        </div>
      </a>

      <a className='menu-item medium' href='#countrywide-infections'>
        {' '}
        <div className='grid-2-sidebar'>
          {' '}
          <div>
            <i className='fas fa-flag-usa'></i>
          </div>{' '}
          <div>Countrywide Infections</div>
        </div>
      </a>

      {/* <a className='menu-item medium' href='#timeline'>
        {' '}
        <div className='grid-2-sidebar'>
          {' '}
          <div>
            <i className='far fa-newspaper'></i>{' '}
          </div>{' '}
          <div>Timeline</div>
        </div>
  </a> */}

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

      <a
        className='menu-item medium'
        href='https://github.com/andyrutherford/covid19-tracker'
        rel='noopener noreferrer'
        target='_blank'
        style={{ position: 'absolute', bottom: '0' }}
      >
        {' '}
        <div className='grid-2-sidebar'>
          {' '}
          <div>
            <i className='fab fa-github'></i>{' '}
          </div>{' '}
          <div>Github</div>
        </div>
      </a>
    </Menu>
  );
};
