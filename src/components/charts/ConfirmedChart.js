import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { Line } from 'react-chartjs-2';
var moment = require('moment');

const ConfirmedChart = ({ confirmedCases, deathCount }) => {
  const [chartConfirmedData, setConfirmedChartData] = useState(null);
  const [chartDeathsData, setChartDeathsData] = useState(null);
  const [chartDates, setChartDates] = useState(null);
  const [chartData, setChartData] = useState(null);

  const formatConfirmedData = () => {
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
      arr.unshift(yesterday);
      return arr.reverse();
    };

    const datesArray = generateDatesArray();

    setChartDates(datesArray);

    const generateTotalsArray = datesArray => {
      const arr = [];
      for (let i = 0; i < datesArray.length; i++) {
        const total = locations
          .map(loc => loc.history[datesArray[i]])
          .reduce((acc, cur) => parseInt(acc) + parseInt(cur));
        arr.push(total);
      }
      return arr;
    };

    const dayTotalsArray = generateTotalsArray(datesArray);

    setConfirmedChartData(dayTotalsArray);

    // const data = {
    //   labels: datesArray,
    //   datasets: [
    //     {
    //       label: 'Confirmed Cases',
    //       fill: false,
    //       backgroundColor: 'rgb(169, 169, 169)',
    //       borderColor: 'rgb(105, 105, 105)',
    //       data: dayTotalsArray
    //     },
    //     {
    //       label: 'Deaths',
    //       fill: false,
    //       backgroundColor: 'rgb(139, 0, 0)',
    //       borderColor: 'rgb(220, 20, 60)',
    //       data: [93, 2040, 5000, 10000, 25000, 36000, 89000, 115000]
    //     }
    //   ]
    // };
    // setChartData(data);
  };

  const formatDeathsData = () => {
    const { locations } = deathCount;
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

    setChartDeathsData(dayTotalsArray);
  };

  const data = {
    labels: chartDates,
    datasets: [
      {
        label: 'Confirmed Cases',
        fill: false,
        backgroundColor: 'rgb(169, 169, 169)',
        borderColor: 'rgb(105, 105, 105)',
        data: chartConfirmedData
      },
      {
        label: 'Deaths',
        fill: false,
        backgroundColor: 'rgb(139, 0, 0)',
        borderColor: 'rgb(220, 20, 60)',
        data: chartDeathsData
      }
    ]
  };

  console.log(data);

  useEffect(() => {
    formatConfirmedData();
    formatDeathsData();
  }, []);

  return (
    <div>
      {chartConfirmedData && chartDeathsData && chartDates && (
        <Line data={data} />
      )}
    </div>
  );
};

export default ConfirmedChart;
