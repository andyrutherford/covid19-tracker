import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

const AgeChart = ({ ageData }) => {
  const [chartData, setChartData] = useState(null);

  const colors = ['maroon', 'red', 'orange', 'yellow', 'lime', 'green'];

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
    labels: labels,
    datasets: [
      {
        label: 'By Age',
        backgroundColor: colors,
        data: percentages
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
      <h2 className='text-primary'>Cases by Age Group</h2>
      {chartData && (
        <Doughnut
          data={chartData}
          options={{
            title: {
              responsive: true,
              maintainAspectRatio: true,
              display: true,
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'left'
            }
          }}
        />
      )}
    </div>
  );
};

export default AgeChart;
