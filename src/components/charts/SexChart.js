import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

const SexChart = ({ sexData }) => {
  const [chartData, setChartData] = useState(null);

  const colors = ['teal', 'pink'];

  // Format labels
  const labels = sexData.map(element => element.sex);

  // Format percentages
  const percentages = sexData.map(element =>
    element.rate.slice(0, element.rate.length - 1)
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'By Age',
        fill: true,
        backgroundColor: colors,
        data: percentages
      }
    ]
  };

  console.log(data);

  useEffect(() => {
    setChartData(data);
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      {' '}
      <h2 className='text-primary'>Cases by Sex</h2>
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
              position: 'right'
            }
          }}
        />
      )}
    </div>
  );
};
export default SexChart;
