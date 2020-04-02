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

  useEffect(() => {
    setChartData(data);
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      {' '}
      <h2 className='text-primary'>Sex</h2>
      {chartData && (
        <div className='demographics-chart-container'>
          <Doughnut
            data={chartData}
            options={{
              title: {
                display: true,
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'left'
              },
              maintainAspectRatio: false,
              responsive: true
            }}
          />
        </div>
      )}
      <div className='demographics-disclaimer'>
        <p className='x-small'>
          Death Rate = (number of deaths / number of cases) = probability of
          dying if infected by the virus (%). The percentages do not have to add
          up to 100%, as they do NOT represent share of deaths by sex.
        </p>
      </div>
    </div>
  );
};
export default SexChart;
