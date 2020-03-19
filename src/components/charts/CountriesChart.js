import React, { useEffect, useState } from 'react';
import CountryChart from './CountryChart';
var moment = require('moment');

const CountriesChart = ({ confirmedCases, deathCount, recoveredCount }) => {
  const selectedCountries = ['US', 'Germany', 'Vietnam', 'China'];

  const [countryData, setCountryData] = useState([]);

  const formatData = country => {
    const { locations } = confirmedCases;

    const datesAndTotals = {};

    if (country === 'US') {
      datesAndTotals.country = 'United States';
    } else {
      datesAndTotals.country = country;
    }

    const filteredCountry = locations.filter(
      element => element.country === country
    );
    console.log(filteredCountry);

    const generateDatesArray = () => {
      const today = moment().format('M/D/YY');
      const arr = [];
      for (let i = 1; i < 40; i++) {
        const date = moment()
          .subtract(i, 'days')
          .format('M/D/YY');
        arr.push(date);
      }
      return arr.reverse();
    };

    const datesArray = generateDatesArray();
    datesAndTotals.dates = datesArray;

    const generateTotalsArray = datesArray => {
      const arr = [];
      for (let i = 0; i < datesArray.length - 1; i++) {
        const total = filteredCountry
          .map(loc => loc.history[datesArray[i]])
          .reduce((acc, cur) => parseInt(acc) + parseInt(cur));
        arr.push(total);
      }

      return arr;
    };

    const dayTotalsArray = generateTotalsArray(datesArray);
    datesAndTotals.totals = dayTotalsArray;
    console.log(datesAndTotals);
    //return datesAndTotals;

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
      {countryData &&
        countryData.map((country, index) => (
          <CountryChart chartData={countryData[index]} />
        ))}
    </div>
  );
};

export default CountriesChart;
