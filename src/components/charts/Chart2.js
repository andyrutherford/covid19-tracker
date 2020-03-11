import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

const Chart2 = ({ confirmedCases }) => {
  const [chartData, setChartData] = useState();

  const formatData = () => {
    const countries = confirmedCases.locations.map(place => {
      return {
        country: place.country,
        latest: place.latest
      };
    });

    // Remove duplicate country entries
    const result = [];
    Array.from(new Set(countries.map(x => x.country))).forEach(x => {
      result.push(
        countries
          .filter(y => y.country === x)
          .reduce((output, item) => {
            let val = output[x] === undefined ? 0 : output[x];
            output[x] = item.latest + val;
            return output;
          }, {})
      );
    });

    // Sort in descending order, and trim
    const final = result.slice(0, 15).map(b => {
      return {
        country: Object.keys(b).toString(),
        latest: Object.values(b).toString()
      };
    });

    final.sort(function(a, b) {
      return parseFloat(b.latest) - parseFloat(a.latest);
    });

    const generateCountriesList = final => {
      const arr = [];
      final.map(c => arr.push(c.country));
      return arr;
    };

    const generateCountriesCases = final => {
      const arr = [];
      final.map(c => arr.push(c.latest));
      return arr;
    };

    const countriesList = generateCountriesList(final);
    const countriesCases = generateCountriesCases(final);

    const generateDynamicColors = () => {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return 'rgb(' + r + ',' + g + ',' + b + ')';
    };

    const colorsArray = () => {
      const colorsArr = [];
      for (let i = 0; i < countriesList.length; i++) {
        colorsArr.push(generateDynamicColors());
      }
      return colorsArr;
    };

    const data = {
      labels: countriesList.slice(0, 10),
      datasets: [
        {
          label: 'Confirmed Cases',
          fill: true,
          backgroundColor: colorsArray(),
          data: countriesCases.slice(0, 10)
        }
      ]
    };
    setChartData(data);
  };

  useEffect(() => {
    formatData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
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

export default Chart2;
