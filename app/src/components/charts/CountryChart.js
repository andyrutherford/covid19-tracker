import React from 'react';
import { Line } from 'react-chartjs-2';

const CountryChart = ({ chartData }) => {
  const { country, dates, totals } = chartData;

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Confirmed Cases',
        fill: false,
        backgroundColor: 'rgb(169, 169, 169)',
        borderColor: 'rgb(105, 105, 105)',
        data: totals.confirmed
      }
    ]
  };

  const options = {
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    },
    scales: {
      xAxes: [
        {
          ticks: {
            display: true,
            autoSkip: true,
            maxTicksLimit: 4
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            display: true,
            autoSkip: true,
            maxTicksLimit: 8,
            callback: function(value, index, values) {
              return value > 1000 ? value / 1000 + 'k' : value;
            }
          }
        }
      ]
    }
  };

  return (
    <div>
      <h3 className='text-primary'>{country}</h3>
      {dates && data && (
        <div>
          <Line data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default CountryChart;
