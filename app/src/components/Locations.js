import React, { useEffect, useState, Fragment } from 'react';
import CountUp from 'react-countup';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

const Locations = ({ locations }) => {
  const [locationList, setLocationList] = useState({
    latestConfirmed: null,
    latestDeaths: null,
    locations: null
  });

  const formatData = () => {
    const data = locations.locations.map(location => ({
      country: location.country === 'US' ? 'United States' : location.country,
      confirmed: location.latest.confirmed,
      deaths: location.latest.deaths
    }));

    // Consolidate duplicates
    var output = data.reduce(function(accumulator, cur) {
      var country = cur.country,
        found = accumulator.find(function(elem) {
          return elem.country === country;
        });
      if (found) {
        found.confirmed += cur.confirmed;
        found.deaths += cur.deaths;
      } else accumulator.push(cur);
      return accumulator;
    }, []);

    // Sort and remove any countries with less than 100 cases
    const final = output
      .sort((a, b) => b.confirmed - a.confirmed)
      .filter(element => element.confirmed > 100);

    setLocationList({
      ...locationList,
      latestConfirmed: locations.latest.confirmed,
      latestDeaths: locations.latest.deaths,
      locations: final
    });
  };

  useEffect(() => {
    formatData();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      {locationList.locations && (
        <Fragment>
          <div className='container' style={{ marginLeft: '-1rem' }}>
            <div>
              <h1 className='text-danger text-center large'>
                <CountUp
                  start={0}
                  end={parseInt(locationList.latestConfirmed)}
                  delay={0}
                  duration={2.5}
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
                  end={parseInt(locationList.latestDeaths)}
                  delay={0}
                  duration={2}
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
                {locationList.locations.map((c, i) => (
                  <li key={i}>
                    <div className='grid-2-stats '>
                      <div className='small'>
                        <div className='text-danger'>{c.confirmed}</div>{' '}
                        <div className='text-primary'>{c.deaths}</div>{' '}
                      </div>
                      <div>
                        <p className='medium'>{c.country}</p>
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

export default Locations;
