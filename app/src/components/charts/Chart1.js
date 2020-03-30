import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
var moment = require('moment');

const Chart1 = ({ confirmedCases, deathCount }) => {
  const [chartConfirmedData, setConfirmedChartData] = useState(null);
  const [chartDeathsData, setChartDeathsData] = useState(null);

  const [chartDates, setChartDates] = useState(null);

  const formatConfirmedData = () => {
    const { locations } = confirmedCases;

    const generateDatesArray = () => {
      const arr = [];
      for (let i = 1; i < 60; i++) {
        const date = moment()
          .subtract(i, 'days')
          .format('M/D/YY');
        arr.push(date);
      }
      return arr.reverse();
    };

    const datesArray = generateDatesArray();
    setChartDates(datesArray);

    const generateTotalsArray = datesArray => {
      const arr = [];
      for (let i = 0; i < datesArray.length - 1; i++) {
        const total = locations
          .map(loc => loc.history[datesArray[i]])
          .reduce((acc, cur) => parseInt(acc) + parseInt(cur));
        arr.push(total);
      }
      arr.push(confirmedCases.latest);

      return arr;
    };
    const dayTotalsArray = generateTotalsArray(datesArray);
    // console.log(dayTotalsArray);

    setConfirmedChartData(dayTotalsArray);
  };

  const formatDeathsData = () => {
    const { locations } = deathCount;

    const generateDatesArray = () => {
      const today = moment().format('M/D/YY');
      const arr = [];
      for (let i = 1; i < 60; i++) {
        const date = moment()
          .subtract(i, 'days')
          .format('M/D/YY');
        arr.push(date);
      }
      arr.push(today);
      return arr;
    };

    const datesArray = generateDatesArray();

    const generateTotalsArray = datesArray => {
      const arr = [];
      for (let i = 0; i < datesArray.length - 1; i++) {
        const total = locations
          .map(loc => loc.history[datesArray[i]])
          .reduce((acc, cur) => parseInt(acc) + parseInt(cur));
        arr.unshift(total);
      }
      arr.push(deathCount.latest);
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
        backgroundColor: 'rgb(220, 20, 60)',
        borderColor: 'rgb(139, 0, 0)',
        data: chartDeathsData
      }
    ]
  };

  useEffect(() => {
    formatConfirmedData();
    formatDeathsData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2 className='text-primary'>Worldwide Confirmed Cases</h2>
      {chartConfirmedData && chartDeathsData && chartDates && (
        <div>
          <Line data={data} />
        </div>
      )}
    </div>
  );
};

export default Chart1;
