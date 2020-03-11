import React, { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

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
        <h1 className='text-danger text-center large'>{latest}</h1>
        <p className='text-center small'>Confirmed Cases</p>
      </div>
      <div className='stat-list-container'>
        <ul>
          {countryList &&
            countryList.map((c, i) => (
              <li key={i}>
                {c.country} - {c.latest}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ConfirmedCases;
