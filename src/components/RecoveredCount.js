import React, { useEffect, useState } from 'react';

const RecoveredCount = ({ recoveredCount }) => {
  const { latest } = recoveredCount;
  const [countryList, setCountryList] = useState();

  const formatData = () => {
    const countries = recoveredCount.locations.map(place => {
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

    // Sort in descending order
    const final = result.slice(0, 50).map(b => {
      return {
        country: Object.keys(b).toString(),
        latest: Object.values(b).toString()
      };
    });

    final.sort(function(a, b) {
      return parseFloat(b.latest) - parseFloat(a.latest);
    });
    setCountryList(final);
  };

  useEffect(() => {
    formatData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div>
        <h1 className='text-success text-center large'>{latest}</h1>
        <p className='text-center small'>Recovered</p>
      </div>
      <div className='stat-list-container'>
        <ul>
          {countryList &&
            countryList.map((c, i) => (
              <li key={i}>
                <div className='grid-2-stats medium'>
                  <div className='text-success'>{c.latest}</div>{' '}
                  <div>{c.country}</div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default RecoveredCount;
