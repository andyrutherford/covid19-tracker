import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import global from '../../global';

var moment = require('moment');

const NewDeathsChart = ({ deathCount }) => {
  const [chartDeathsData, setDeathsChartData] = useState(null);
  const [chartDates, setChartDates] = useState(null);

  const formatDeathsData = () => {
    const { locations } = deathCount;

    const generateDatesArray = () => {
      const arr = [];
      for (let i = 1; i < global.DAYS_TO_SHOW; i++) {
        const date = moment().subtract(i, 'days').format('M/D/YY');
        arr.push(date);
      }
      return arr.reverse();
    };

    const datesArray = generateDatesArray();
    setChartDates(datesArray);

    const generateTotalsArray = (datesArray) => {
      const arr = [];
      for (let i = 0; i < datesArray.length - 1; i++) {
        const total = locations
          .map((loc) => loc.history[datesArray[i]])
          .reduce((acc, cur) => parseInt(acc) + parseInt(cur));
        arr.push(total);
      }
      arr.push(deathCount.latest);

      let newCases = [];
      for (let i = 0; i < arr.length - 1; i++) {
        newCases.push(arr[i + 1] - arr[i]);
      }

      return newCases;
    };
    const dayTotalsArray = generateTotalsArray(datesArray);

    setDeathsChartData(dayTotalsArray);
  };

  const data = {
    labels: chartDates,
    datasets: [
      {
        label: 'Deaths',
        fill: false,
        backgroundColor: 'rgb(220, 20, 60)',
        borderColor: 'rgb(139, 0, 0)',
        data: chartDeathsData,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            callback: function (value, index, values) {
              return value > 1000 ? value / 1000 + 'k' : value;
            },
          },
        },
      ],
    },
    legend: {
      display: false,
      position: 'bottom',
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  useEffect(() => {
    formatDeathsData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2 className='text-primary'>Deaths Per Day</h2>
      {chartDeathsData && chartDates && (
        <div className='chart-container'>
          <Bar data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default NewDeathsChart;
