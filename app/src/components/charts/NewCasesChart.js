import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
var moment = require('moment');

const NewCasesChart = ({ confirmedCases }) => {
  const [chartConfirmedData, setConfirmedChartData] = useState(null);
  const [chartDates, setChartDates] = useState(null);

  const formatConfirmedData = () => {
    const { locations } = confirmedCases;

    const generateDatesArray = () => {
      const arr = [];
      for (let i = 1; i < 45; i++) {
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
      arr.push(confirmedCases.latest);

      let newCases = [];
      for (let i = 0; i < arr.length - 1; i++) {
        newCases.push(arr[i + 1] - arr[i]);
      }

      return newCases;
    };
    const dayTotalsArray = generateTotalsArray(datesArray);

    setConfirmedChartData(dayTotalsArray);
  };

  const data = {
    labels: chartDates,
    datasets: [
      {
        label: 'Confirmed Cases',
        fill: false,
        backgroundColor: 'rgb(169, 169, 169)',
        borderColor: 'rgb(105, 105, 105)',
        data: chartConfirmedData,
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
    formatConfirmedData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2 className='text-primary'>New Cases Per Day</h2>
      {chartConfirmedData && chartDates && (
        <div className='chart-container'>
          <Bar data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default NewCasesChart;
