import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

const Chart2 = ({ chartData, title }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(chartData);
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
                display: true,
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
