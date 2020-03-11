import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { Line } from 'react-chartjs-2';
var moment = require('moment');

const ConfirmedChart = ({ confirmedCases }) => {
  const [confirmed, setConfirmed] = useState(null);
  const [deaths, setDeaths] = useState(null);
  const [chartData, setChartData] = useState(null);

  const formatData = () => {
    const { locations } = confirmedCases;
    //locations.slice(0, 3).map(a => console.log(a.history['3/9/20']));

    const generateDatesArray = () => {
      const yesterday = moment()
        .subtract(1, 'days')
        .format('M/D/YY');
      const arr = [];
      for (let i = 1; i < 8; i++) {
        const date = moment()
          .subtract(i, 'weeks')
          .format('M/D/YY');
        arr.push(date);
      }
      arr.push(yesterday);
      return arr;
    };

    const datesArray = generateDatesArray();

    const generateTotalsArray = datesArray => {
      const arr = [];
      for (let i = 0; i < datesArray.length; i++) {
        const total = locations
          .map(loc => loc.history[datesArray[i]])
          .reduce((acc, cur) => parseInt(acc) + parseInt(cur));
        arr.unshift(total);
      }
      return arr;
    };

    const dayTotalsArray = generateTotalsArray(datesArray);

    const data = {
      labels: datesArray,
      datasets: [
        {
          label: 'Confirmed Cases',
          fill: false,
          backgroundColor: 'rgb(169, 169, 169)',
          borderColor: 'rgb(105, 105, 105)',
          data: dayTotalsArray
        },
        {
          label: 'Deaths',
          fill: false,
          backgroundColor: 'rgb(139, 0, 0)',
          borderColor: 'rgb(220, 20, 60)',
          data: [93, 2040, 5000, 10000, 25000, 36000, 89000, 115000]
        }
      ]
    };
    setChartData(data);
  };

  useEffect(() => {
    setConfirmed(confirmedCases);
    formatData();
  }, []);

  return <div>{chartData && <Line data={chartData} />}</div>;
};

export default ConfirmedChart;
