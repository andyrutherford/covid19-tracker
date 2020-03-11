import React, { useEffect, useState } from 'react';

const DeathCount = ({ deathCount }) => {
  const { lastUpdated, latest, location } = deathCount;
  const [countryList, setCountryList] = useState();

  const formatData = () => {
    const countries = deathCount.locations.map(place => {
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
    const final = result.slice(0, 15).map(b => {
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
  }, []);

  return (
    <div>
      <h2 className='text-primary'>{latest}</h2>
      <p>DeathCount </p>
      <ul>
        {countryList &&
          countryList.map((c, i) => (
            <li key={i}>
              {c.country} - {c.latest}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DeathCount;
