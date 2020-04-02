import React, { useState, useEffect } from 'react';
import Chart2 from './Chart2';

const CasesByCountryChart = ({ confirmedCases }) => {
  const [chartDataExclChina, setChartDataExclChina] = useState(null);

  const formatDataExclChina = () => {
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

    //Find total cases for China
    let chinaTotal;
    result.forEach(element => {
      for (let e in element) {
        if (e === 'China') {
          chinaTotal = element[e];
        }
      }
    });

    // Sort in descending order, and trim
    const duplicatesRemoved = result.map(b => {
      return {
        country: Object.keys(b).toString(),
        latest: Object.values(b).toString()
      };
    });

    const formattedArray = duplicatesRemoved
      .sort(function(a, b) {
        return parseFloat(b.latest) - parseFloat(a.latest);
      })
      .slice(0, 10);

    const generateCountriesList = formattedArray => {
      const arr = [];
      formattedArray.map(c => arr.push(c.country));
      return arr;
    };

    const generateCountriesCases = formattedArray => {
      const arr = [];
      formattedArray.map(c => arr.push(c.latest));
      return arr;
    };

    const countriesList = generateCountriesList(formattedArray);
    const countriesCases = generateCountriesCases(formattedArray);

    const chinaIndex = countriesList.indexOf('China');
    const countriesListExclChina = countriesList.filter(
      element => element !== 'China'
    );
    countriesListExclChina.push('Rest of World');

    const countriesDataExclChina = countriesCases.filter(
      (element, index) => index !== chinaIndex
    );

    const restOfWorldData =
      confirmedCases.latest -
      chinaTotal -
      countriesDataExclChina.reduce(
        (prev, cur) => parseInt(prev) + parseInt(cur)
      );

    countriesDataExclChina.push(restOfWorldData.toString());

    const chartData = {
      labels: countriesListExclChina,
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
            '#EBF5FB'
          ],
          data: countriesDataExclChina.slice(0, 10)
        }
      ]
    };

    setChartDataExclChina(chartData);
  };

  useEffect(() => {
    formatDataExclChina();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <div>
        {chartDataExclChina && (
          <Chart2
            chartData={chartDataExclChina}
            title={'Cases outside of China'}
            showLegend={true}
          />
        )}
      </div>
    </div>
  );
};

export default CasesByCountryChart;
