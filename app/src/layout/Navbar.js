import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import ReactTooltip from 'react-tooltip';
import SideBar from '../layout/Sidebar';

const Navbar = ({ title, lastUpdated }) => {
  return (
    <div>
      <SideBar pageWrapId={'page-wrap'} outerContainerId={'App'} />

      <div className='navbar bg-primary'>
        <div>
          <h2 className='navbar-title'>
            <a href='/'>
              <i className='fas fa-globe-americas fa-lg'></i> {title}
            </a>
          </h2>
        </div>
        <ul>
          {lastUpdated && (
            <li className='navbar-subtext small'>
              Last updated{' '}
              <Moment local format='HH:mm MMM DD YYYY '>
                {lastUpdated}
              </Moment>{' '}
            </li>
          )}
          <li className='nav-link'>
            <Link to='/' data-tip='Worldwide'>
              <i className='fas fa-globe'></i>
            </Link>
            <ReactTooltip place='left' type='dark' effect='solid' />
          </li>
          <li className='nav-link'>
            <Link to='/united-states' data-tip='United States'>
              <i className='fas fa-flag-usa'></i>
            </Link>
            <ReactTooltip place='left' type='dark' effect='solid' />
          </li>
          {/* <li className='nav-link'>
          <a href='#' onClick={onShowModal}>
            <i className='fas fa-question fa-lg'></i>
          </a>

          <Rodal visible={showModal} onClose={onHideModal} width={600}>
            <div className='modal'>
              <h2>Coronavirus COVID-19 Tracker</h2>
              <p className='small'>
                This dashboard contains a comprehensive overview of the
                progression of the{' '}
                <a
                  href='https://www.who.int/emergencies/diseases/novel-coronavirus-2019'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  Coronavirus COVID-19
                </a>{' '}
                spread.
              </p>
              <p className='small'>
                It is under constant development and features may be added or
                removed without notice.
              </p>
              <p className='small'>
                This page and its contents, including all data and mapping is
                provided for educational and academic research purposes. The
                page relies upon publicly available data sourced from{' '}
                <a href='https://github.com/CSSEGISandData/COVID-19'>
                  JHU CSSE
                </a>{' '}
                and ExpDev07's{' '}
                <a href='https://github.com/ExpDev07/coronavirus-tracker-api'>
                  coronavirus-tracker-api
                </a>
                . Demographics data comes from worldometer's{' '}
                <a
                  href='https://www.worldometers.info/coronavirus/coronavirus-age-sex-demographics/'
                  rel='noopener noreferrer'
                  taget='_blank'
                >
                  COVID-19 Demographics
                </a>
                .
              </p>

              <p className='small'>
                For any questions or inquires, send me an email at{' '}
                <a href='mailto:andrew.rutherford.6@gmail.com' target='_top'>
                  andrew.rutherford.6@gmail.com
                </a>
              </p>
            </div>
          </Rodal>
        </li>*/}
        </ul>
      </div>
    </div>
  );
};

Navbar.defaultProps = {
  title: 'COVID-19 Tracker',
};

export default Navbar;
