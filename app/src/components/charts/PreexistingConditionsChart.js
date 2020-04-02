import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const PreexistingConditionsChart = ({ preexistingConditionsData }) => {
  const [chartData, setChartData] = useState(null);

  const formatData = () => {
    const labels = preexistingConditionsData.map(
      element => element.preExistingCondition
    );
    const percentages = preexistingConditionsData.map(element =>
      element.rate.slice(0, element.rate.length - 1)
    );

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Death Rate (%)',
          backgroundColor: [
            '#1B4F72',
            '#21618C',
            '#2874A6',
            '#2E86C1',
            '#3498DB',
            '#5DADE2',
            '#85C1E9',
            '#AED6F1',
            '#D6EAF8',
            '#EBF5FB'
          ],
          data: percentages
        }
      ]
    };

    setChartData(data);
  };

  useEffect(() => {
    formatData();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      {' '}
      <h2 className='text-primary'>Pre-Existing Conditions</h2>
      {chartData && (
        <div className='demographics-chart-container'>
          <Bar
            data={chartData}
            options={{
              title: {
                responsive: true,
                display: true,
                fontSize: 20
              },
              legend: {
                display: false,
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
          up to 100%, as they do NOT represent share of deaths by condition.
        </p>
      </div>
    </div>
  );
};

export default PreexistingConditionsChart;
