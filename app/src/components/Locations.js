import React, { Fragment } from 'react';
import CountUp from 'react-countup';
import FlagIcon from '../components/FlagIcon';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

const Locations = ({ locations, showFlags }) => {
  return (
    <div>
      {locations && (
        <Fragment>
          <div
            className='container case-totals'
            style={{ marginLeft: '-1rem' }}
          >
            <div>
              {' '}
              <h1 className='text-danger text-center large'>
                <CountUp
                  start={0}
                  end={parseInt(locations.latestConfirmed)}
                  delay={0}
                  duration={2}
                  separator={','}
                >
                  {({ countUpRef }) => (
                    <div>
                      <span ref={countUpRef} />
                    </div>
                  )}
                </CountUp>
              </h1>
              <p className='text-center small'>Confirmed Cases</p>
            </div>
            <div>
              <h1 className='text-primary text-center large'>
                <CountUp
                  start={0}
                  end={parseInt(locations.latestDeaths)}
                  delay={0}
                  duration={2}
                  separator={','}
                >
                  {({ countUpRef }) => (
                    <div>
                      <span ref={countUpRef} />
                    </div>
                  )}
                </CountUp>
              </h1>
              <p className='text-center small'>Deaths</p>
            </div>
          </div>
          <div className='stat-list-container'>
            <PerfectScrollbar>
              <ul>
                {locations.locations.map((c, i) => (
                  <li key={i}>
                    <div className='grid-2-stats'>
                      <div className='small'>
                        <div className='text-danger text-right'>
                          {c.confirmed.toLocaleString()}
                        </div>{' '}
                        <div className='text-primary text-right'>
                          {c.deaths.toLocaleString()}
                        </div>{' '}
                      </div>
                      <div>
                        {showFlags && <FlagIcon code={c.loc_code} />}{' '}
                        <p style={{ display: 'inline-block' }}>{c.loc}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </PerfectScrollbar>
          </div>
        </Fragment>
      )}
    </div>
  );
};

Locations.defaultProps = {
  showFlags: true,
};

export default Locations;
