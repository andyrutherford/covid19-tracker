import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
var moment = require('moment');

const CountriesChart = ({ confirmedCases, deathCount }) => {
  const selectedCountries = [
    'US',
    'Germany',
    'Italy',
    'Korea, South',
    'Iran',
    'Spain',
    'China',
  ];

  const chartColors = [
    '#003f5c',
    '#444e86',
    '#955196',
    '#dd5182',
    '#ff6e54',
    '#ffa600',
    'maroon',
  ];

  const [confirmedData, setConfirmedData] = useState(null);
  const [deathsData, setDeathsData] = useState(null);

  const [chartData, setChartData] = useState({
    confirmed: {
      totals: null,
      new: null,
    },
    deaths: { totals: null, new: null },
  });

  const formatData = (selectedCountries, selectedDataset, key) => {
    const locations = selectedDataset.locations;

    const data = {
      dates: [],
      dataset: [],
    };

    // Create dates array
    const generateDatesArray = () => {
      const arr = [];
      for (let i = 1; i < 30; i++) {
        const date = moment().subtract(i, 'days').format('M/D/YY');
        arr.push(date);
      }
      return arr.reverse();
    };

    const datesArray = generateDatesArray();
    data.dates = datesArray;

    for (let country of selectedCountries) {
      const filteredCountryConfirmed = locations.filter(
        (element) => element.country === country
      );

      const generateTotalsArray = (datesArray, totalsArray) => {
        const arr = [];
        for (let i = 0; i < datesArray.length; i++) {
          const total = totalsArray
            .map((loc) => loc.history[datesArray[i]])
            .reduce((acc, cur) => parseInt(acc) + parseInt(cur));
          arr.push(total);
        }

        let newCases = [];
        for (let i = 0; i < arr.length - 1; i++) {
          newCases.push(arr[i + 1] - arr[i]);
        }

        return { totals: arr, new: newCases };
      };

      const countryData = generateTotalsArray(
        datesArray,
        filteredCountryConfirmed
      );

      data.dataset.push({
        country: country,
        totals: countryData.totals,
        new: countryData.new,
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
    datasets: [],
  };

  const newConfData = {
    labels: null,
    datasets: [],
  };

  const detData = {
    labels: null,
    datasets: [],
  };

  const newDetData = {
    labels: null,
    datasets: [],
  };

  const options = {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        boxWidth: 20,
      },
    },
    elements: {
      point: {
        radius: 3,
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            display: true,
            autoSkip: true,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            display: true,
            autoSkip: true,
            maxTicksLimit: 8,
            callback: function (value, index, values) {
              return value > 1000 ? value / 1000 + 'k' : value;
            },
          },
        },
      ],
    },
    maintainAspectRatio: false,
  };

  const generateChartData = (key) => {
    // Generate chart data for confirmed totals
    if (key === 'confirmed') {
      confData.labels = confirmedData.dates;
      for (let [index, set] of confirmedData.dataset.entries()) {
        confData.datasets.push({
          label: set.country === 'US' ? 'United States' : set.country,
          fill: false,
          backgroundColor: 'rgb(169, 169, 169)',
          borderColor: chartColors[index],
          data: set.totals,
        });
      }

      // Generate chart data for new confirmed cases
      newConfData.labels = confirmedData.dates;
      for (let [index, set] of confirmedData.dataset.entries()) {
        newConfData.datasets.push({
          label: set.country === 'US' ? 'United States' : set.country,
          fill: false,
          backgroundColor: 'rgb(169, 169, 169)',
          borderColor: chartColors[index],
          data: set.new,
        });
      }

      setChartData((prevState) => ({
        ...prevState,
        confirmed: { totals: confData, new: newConfData },
      }));
    }

    // Generate chart data for death totals
    if (key === 'deaths') {
      detData.labels = deathsData.dates;
      for (let [index, set] of deathsData.dataset.entries()) {
        detData.datasets.push({
          label: set.country === 'US' ? 'United States' : set.country,
          fill: false,
          backgroundColor: 'rgb(169, 169, 169)',
          borderColor: chartColors[index],
          data: set.totals,
        });
      }

      // Generate chart data for new deaths
      newDetData.labels = deathsData.dates;
      for (let [index, set] of deathsData.dataset.entries()) {
        newDetData.datasets.push({
          label: set.country === 'US' ? 'United States' : set.country,
          fill: false,
          backgroundColor: 'rgb(169, 169, 169)',
          borderColor: chartColors[index],
          data: set.new,
        });
      }

      setChartData((prevState) => ({
        ...prevState,
        deaths: { totals: detData, new: newDetData },
      }));
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
    <div className='grid-2'>
      <div>
        <div className='card'>
          {' '}
          <h2 className='text-primary'>Confirmed Cases</h2>{' '}
          {chartData.confirmed.totals && (
            <div className='chart-container'>
              <Line data={chartData.confirmed.totals} options={options} />
            </div>
          )}{' '}
          <h2 className='text-primary'>Deaths</h2>{' '}
          {chartData.deaths.totals && (
            <div className='chart-container'>
              <Line data={chartData.deaths.totals} options={options} />
            </div>
          )}
        </div>
      </div>
      <div>
        {' '}
        <div className='card'>
          {' '}
          <h2 className='text-primary'>New Cases</h2>{' '}
          {chartData.confirmed.new && (
            <div className='chart-container'>
              <Line data={chartData.confirmed.new} options={options} />
            </div>
          )}{' '}
          <h2 className='text-primary'>New Deaths</h2>{' '}
          {chartData.deaths.new && (
            <div className='chart-container'>
              <Line data={chartData.deaths.new} options={options} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountriesChart;
