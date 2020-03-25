import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
var moment = require('moment');

const CountriesChart = ({ confirmedCases, deathCount }) => {
  const selectedCountries = [
    'US',
    'Germany',
    'Italy',
    'Korea, South',
    'United Kingdom',
    'Spain'
  ];

  const chartColors = [
    '#003f5c',
    '#444e86',
    '#955196',
    '#dd5182',
    '#ff6e54',
    '#ffa600'
  ];

  const [confirmedData, setConfirmedData] = useState(null);
  const [deathsData, setDeathsData] = useState(null);

  const [confirmedChartData, setConfirmedChartData] = useState(null);
  const [deathsChartData, setDeathsChartData] = useState(null);

  const formatData = (selectedCountries, selectedDataset, key) => {
    const locations = selectedDataset.locations;

    const data = {
      dates: [],
      dataset: []
    };

    // Create dates array
    const generateDatesArray = () => {
      const arr = [];
      for (let i = 1; i < 30; i++) {
        const date = moment()
          .subtract(i, 'days')
          .format('M/D/YY');
        arr.push(date);
      }
      return arr.reverse();
    };

    const datesArray = generateDatesArray();
    data.dates = datesArray;

    for (let country of selectedCountries) {
      const filteredCountryConfirmed = locations.filter(
        element => element.country === country
      );

      const generateTotalsArray = (datesArray, totalsArray) => {
        const arr = [];
        for (let i = 0; i < datesArray.length; i++) {
          const total = totalsArray
            .map(loc => loc.history[datesArray[i]])
            .reduce((acc, cur) => parseInt(acc) + parseInt(cur));
          arr.push(total);
        }
        return arr;
      };

      const countryTotals = generateTotalsArray(
        datesArray,
        filteredCountryConfirmed
      );

      data.dataset.push({
        country: country,
        totals: countryTotals
      });
    }

    if (key === 'confirmed') {
      setConfirmedData(data);
    }
    if (key === 'deaths') {
      setDeathsData(data);
    }
  };

  const confData = {
    labels: null,
    datasets: []
  };

  const detData = {
    labels: null,
    datasets: []
  };

  const options = {
    legend: {
      display: true
    },
    elements: {
      point: {
        radius: 3
      }
    },
    scales: {
      xAxes: [
        {
          ticks: {
            display: true,
            autoSkip: true
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            display: true,
            autoSkip: true,
            maxTicksLimit: 8
          }
        }
      ]
    }
  };

  const generateChartData = key => {
    if (key === 'confirmed') {
      confData.labels = confirmedData.dates;
      for (let [index, set] of confirmedData.dataset.entries()) {
        confData.datasets.push({
          label: set.country,
          fill: false,
          backgroundColor: 'rgb(169, 169, 169)',
          borderColor: chartColors[index],
          data: set.totals
        });
      }
      setConfirmedChartData(confData);
    }
    if (key === 'deaths') {
      detData.labels = deathsData.dates;
      for (let [index, set] of deathsData.dataset.entries()) {
        detData.datasets.push({
          label: set.country,
          fill: false,
          backgroundColor: 'rgb(169, 169, 169)',
          borderColor: chartColors[index],
          data: set.totals
        });
      }
      setDeathsChartData(detData);
    }
  };

  useEffect(() => {
    formatData(selectedCountries, confirmedCases, 'confirmed');
    formatData(selectedCountries, deathCount, 'deaths');
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (confirmedData) {
      generateChartData('confirmed');
    }
    //eslint-disable-next-line
  }, [confirmedData]);

  useEffect(() => {
    if (deathsData) {
      generateChartData('deaths');
    }
    //eslint-disable-next-line
  }, [deathsData]);

  return (
    <div>
      <div>
        {' '}
        <h3 className='text-primary'>Confirmed Cases</h3>{' '}
        {confirmedChartData && (
          <div>
            <Line data={confirmedChartData} options={options} />
          </div>
        )}
      </div>
      <div>
        {' '}
        <h3 className='text-primary'>Deaths</h3>{' '}
        {deathsChartData && (
          <div>
            <Line data={deathsChartData} options={options} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CountriesChart;
