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
      },
      {
        label: 'Deaths',
        fill: false,
        backgroundColor: 'rgb(220, 20, 60)',
        borderColor: 'rgb(139, 0, 0)',
        data: totals.deaths
      },
      {
        label: 'Recovered',
        fill: false,
        backgroundColor: 'rgb(0, 255, 0)',
        borderColor: 'rgb(50,205,50)',
        data: totals.recovered
      }
    ]
  };

  const options = {
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 2
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
            maxTicksLimit: 8
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
