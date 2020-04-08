import React, { useState, useEffect } from 'react';
import Chart2 from './Chart2';

const CasesByCountryChart = ({ confirmedCases }) => {
  const [chartData, setChartData] = useState(null);

  const formatData = () => {
    const countries = confirmedCases.locations.map((place) => {
      return {
        country: place.country,
        latest: place.latest,
      };
    });

    // Remove duplicate country entries
    const result = [];
    Array.from(new Set(countries.map((x) => x.country))).forEach((x) => {
      result.push(
        countries
          .filter((y) => y.country === x)
          .reduce((output, item) => {
            let val = output[x] === undefined ? 0 : output[x];
            output[x] = item.latest + val;
            return output;
          }, {})
      );
    });

    // Sort in descending order, and trim
    const duplicatesRemoved = result.map((b) => {
      return {
        country: Object.keys(b).toString(),
        latest: Object.values(b).toString(),
      };
    });

    const formattedArray = duplicatesRemoved
      .sort(function (a, b) {
        return parseFloat(b.latest) - parseFloat(a.latest);
      })
      .slice(0, 9);

    const generateCountriesList = (formattedArray) => {
      const arr = [];
      formattedArray.map((c) => arr.push(c.country));
      return arr;
    };

    const generateCountriesCases = (formattedArray) => {
      const arr = [];
      formattedArray.map((c) => arr.push(c.latest));
      return arr;
    };

    const countriesList = generateCountriesList(formattedArray);
    const countriesCases = generateCountriesCases(formattedArray);

    countriesList.push('Rest of World');

    const restOfWorldData =
      confirmedCases.latest -
      countriesCases.reduce((prev, cur) => parseInt(prev) + parseInt(cur));

    countriesCases.push(restOfWorldData.toString());

    const chartData = {
      labels: countriesList,
      datasets: [
        {
          label: 'Confirmed Cases',
          fill: true,
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
            '#EBF5FB',
          ],
          data: countriesCases.slice(0, 10),
        },
      ],
    };

    setChartData(chartData);
  };

  useEffect(() => {
    formatData();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <div>
        {chartData && (
          <Chart2
            chartData={chartData}
            title={'Percent of Confirmed Cases by Country'}
            showLegend={true}
          />
        )}
      </div>
    </div>
  );
};

export default CasesByCountryChart;
