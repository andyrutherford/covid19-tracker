import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

const Chart2 = ({ confirmedCases }) => {
  const [data, setData] = useState();
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
    // console.log(final);
    setData(final);

    const generateCountriesList = final => {
      const arr = [];
      // console.log(final);
      final.map(c => arr.push(c.country));
      return arr;
    };

    const generateCountriesCases = final => {
      const arr = [];
      console.log(final);
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
      labels: countriesList,
      datasets: [
        {
          label: 'Confirmed Cases',
          fill: true,
          backgroundColor: colorsArray(),
          borderColor: 'rgb(220, 20, 60)',
          data: countriesCases
        }
      ]
    };
    setChartData(data);
  };

  useEffect(() => {
    formatData();
  }, []);

  return <div>{chartData && <Pie data={chartData} />}</div>;
};

export default Chart2;
