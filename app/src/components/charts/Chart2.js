import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

const Chart2 = ({ chartData, title, showLegend }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(chartData);
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      {data && (
        <div>
          <h2 className='text-primary'>{title}</h2>
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
                display: showLegend,
                position: 'right'
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Chart2;
