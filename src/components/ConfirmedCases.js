import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';

const ConfirmedCases = ({ confirmedCases }) => {
  const { latest } = confirmedCases;
  const [countryList, setCountryList] = useState();

  const formatData = () => {
    const countries = confirmedCases.locations.map(place => {
      return {
        country: place.country,
        latest: place.latest
      };
    });

    // Remove duplicate country entries
    const result = [];
    Array.from(new Set(countries.map(x => x.country))).forEach(x => {
      result.push(
        countries
          .filter(y => y.country === x)
          .reduce((output, item) => {
            let val = output[x] === undefined ? 0 : output[x];
            output[x] = item.latest + val;
            return output;
          }, {})
      );
    });

    // Sort in descending order, and trim
    const final = result.map(b => {
      return {
        country: Object.keys(b).toString(),
        latest: Object.values(b).toString()
      };
    });

    const countryArray = final
      .sort(function(a, b) {
        return parseFloat(b.latest) - parseFloat(a.latest);
      })
      .filter(element => element.latest > 0)
      .slice(0, 100);
    setCountryList(countryArray);
  };

  useEffect(() => {
    formatData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className='container'>
        <h1 className='text-danger text-center large'>
          <CountUp
            start={latest / 2}
            end={parseInt(latest)}
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
        <p className='text-center small'>Confirmed Cases</p>
      </div>
      <div className='stat-list-container'>
        <ul>
          {countryList &&
            countryList.map((c, i) => (
              <li key={i}>
                <div className='grid-2-stats medium'>
                  <div className='text-danger'>
                    <CountUp
                      start={0}
                      end={parseInt(c.latest)}
                      delay={0}
                      duration={Math.random() * (2 - 1) + 1}
                    >
                      {({ countUpRef }) => (
                        <div>
                          <span ref={countUpRef} />
                        </div>
                      )}
                    </CountUp>
                  </div>{' '}
                  <div>{c.country}</div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ConfirmedCases;
