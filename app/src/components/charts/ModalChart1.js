import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
var moment = require('moment');

const ModalChart1 = ({ confirmedCases, deathCount }) => {
  const [chartData, setChartData] = useState({
    dates: null,
    confirmed: null,
    deaths: null
  });

  const formatChartData = () => {
    const generateDatesArray = () => {
      const arr = [];
      for (let i = 1; i < 50; i++) {
        const date = moment()
          .subtract(i, 'days')
          .format('M/D/YY');
        arr.push(date);
      }
      return arr.reverse();
    };

    const datesArray = generateDatesArray();

    const generateTotalsArray = (datesArray, data) => {
      const arr = [];
      for (let i = 0; i < datesArray.length - 1; i++) {
        const total = data
          .map(loc => loc.history[datesArray[i]])
          .reduce((acc, cur) => parseInt(acc) + parseInt(cur), 0);
        arr.push(total);
      }
      return arr;
    };

    const confirmedTotals = generateTotalsArray(datesArray, confirmedCases);
    const deathTotals = generateTotalsArray(datesArray, deathCount);
    setChartData({
      ...chartData,
      dates: datesArray,
      confirmed: confirmedTotals,
      deaths: deathTotals
    });
  };

  const data = {
    labels: chartData.dates,
    datasets: [
      {
        label: 'Confirmed Cases',
        fill: false,
        backgroundColor: 'rgb(169, 169, 169)',
        borderColor: 'rgb(105, 105, 105)',
        data: chartData.confirmed
      },
      {
        label: 'Deaths',
        fill: false,
        backgroundColor: 'rgb(220, 20, 60)',
        borderColor: 'rgb(139, 0, 0)',
        data: chartData.deaths
      }
    ]
  };

  const options = {
    responsive: true
  };

  useEffect(() => {
    formatChartData();
    //eslint-disable-next-line
  }, [confirmedCases]);

  return (
    <div>
      {' '}
      <Line data={data} options={options} />
    </div>
  );
};

export default ModalChart1;
