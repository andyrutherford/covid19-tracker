import React, { useEffect, useState } from 'react';
import CountryChart from './CountryChart';
var moment = require('moment');

const CountriesChart = ({ confirmedCases, deathCount, recoveredCount }) => {
  const selectedCountries = ['US', 'Germany', 'Vietnam', 'China'];

  const [countryData, setCountryData] = useState([]);

  const formatData = country => {
    const confirmedLocations = confirmedCases.locations;
    const deathLocations = deathCount.locations;
    const recoveredLocations = recoveredCount.locations;

    const datesAndTotals = {
      country: null,
      dates: null,
      totals: {
        confirmed: null,
        deaths: null,
        recovered: null
      }
    };

    // { country: 'usa', dates: [], totals: [{ confirmed: []}, {deaths: []}, {recovered: []}]}

    if (country === 'US') {
      datesAndTotals.country = 'United States';
    } else {
      datesAndTotals.country = country;
    }

    const filteredCountryConfirmed = confirmedLocations.filter(
      element => element.country === country
    );

    const filteredCountryDeaths = deathLocations.filter(
      element => element.country === country
    );

    const filteredCountryRecovered = recoveredLocations.filter(
      element => element.country === country
    );

    const generateDatesArray = () => {
      const today = moment().format('M/D/YY');
      const arr = [];
      for (let i = 1; i < 40; i++) {
        const date = moment()
          .subtract(i, 'days')
          .format('M/D/YY');
        arr.push(date);
      }
      arr.unshift(today);
      return arr.reverse();
    };

    const datesArray = generateDatesArray();
    datesAndTotals.dates = datesArray;

    const generateTotalsArray = (datesArray, totalsArray) => {
      const arr = [];
      for (let i = 0; i < datesArray.length - 1; i++) {
        const total = totalsArray
          .map(loc => loc.history[datesArray[i]])
          .reduce((acc, cur) => parseInt(acc) + parseInt(cur));
        arr.push(total);
      }

      return arr;
    };

    const confirmedTotalsArray = generateTotalsArray(
      datesArray,
      filteredCountryConfirmed
    );
    const deathTotalsArray = generateTotalsArray(
      datesArray,
      filteredCountryDeaths
    );
    const recoveredTotalsArray = generateTotalsArray(
      datesArray,
      filteredCountryRecovered
    );

    datesAndTotals.totals.confirmed = confirmedTotalsArray;
    datesAndTotals.totals.deaths = deathTotalsArray;
    datesAndTotals.totals.recovered = recoveredTotalsArray;

    setCountryData(countries => [...countries, datesAndTotals]);
  };

  useEffect(() => {
    for (const element in selectedCountries) {
      formatData(selectedCountries[element]);
    }

    //eslint-disable-next-line
  }, []);

  return (
    <div className='grid-2'>
      {' '}
      {countryData &&
        countryData.map((country, index) => (
          <CountryChart key={index} chartData={countryData[index]} />
        ))}
    </div>
  );
};

export default CountriesChart;
