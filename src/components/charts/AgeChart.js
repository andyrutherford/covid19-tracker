import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const AgeChart = ({ ageData }) => {
  const [chartData, setChartData] = useState(null);

  // Format labels to show only 5 age groups
  const labels = ageData.map(ageGroup => ageGroup.age).slice(0, 4);
  labels.push('0-50 years old');

  //Sum percentages of all age groups between zero and fifty
  const zeroToFiftyPercent = ageData
    .slice(4, ageData.length - 1)
    .map(element => parseFloat(element.rate))
    .reduce((prev, cur) => prev + cur)
    .toString();

  // Format percentages to amount or zero if there are no fatalities
  const percentages = ageData
    .slice(0, 4)
    .map(ageGroup => {
      if (ageGroup.rate === 'no fatalities') {
        return '0.0';
      }
      return ageGroup.rate.slice(0, ageGroup.rate.length - 1);
    })
    .concat(zeroToFiftyPercent);

  const data = {
    labels: labels.reverse(),
    datasets: [
      {
        label: 'By Age',
        backgroundColor: 'rgb(51,51,51)',
        data: percentages.reverse()
      }
    ]
  };

  useEffect(() => {
    setChartData(data);
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      {' '}
      <h2 className='text-primary'>Age Group</h2>
      {chartData && (
        <Bar
          data={chartData}
          options={{
            title: {
              responsive: true,
              maintainAspectRatio: true,
              display: true,
              fontSize: 20
            },
            legend: {
              display: false,
              position: 'left'
            }
          }}
        />
      )}
      <div style={{ width: '50%' }}>
        <p className='x-small'>
          Death Rate = (number of deaths / number of cases) = probability of
          dying if infected by the virus (%). The percentages do not have to add
          up to 100%, as they do NOT represent share of deaths by age group.
        </p>
      </div>
    </div>
  );
};

export default AgeChart;
