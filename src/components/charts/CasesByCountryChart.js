import React, { useState, useEffect } from 'react';
import Chart2 from './Chart2';

const CasesByCountryChart = ({ confirmedCases }) => {
  const [colorsArray, setColorsArray] = useState(null);
  const [chartDataInclChina, setChartDataInclChina] = useState(null);
  const [chartDataExclChina, setChartDataExclChina] = useState(null);

  const generateColors = () => {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  };

  // Generate 20 random colors
  const generateColorsArray = () => {
    const colorsArr = [];
    for (let i = 0; i < 21; i++) {
      colorsArr.push(generateColors());
    }
    // setColorsArray(colorsArr);
    return colorsArr;
  };

  const colors = generateColorsArray();

  const formatDataInclChina = () => {
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
      .slice(0, 20);

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

    const chartData = {
      labels: countriesList.slice(0, 10),
      datasets: [
        {
          label: 'Confirmed Cases',
          fill: true,
          backgroundColor: colors,
          data: countriesCases.slice(0, 10)
        }
      ]
    };

    setChartDataInclChina(chartData);
  };

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
      .slice(0, 20);

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
    const countriesDataExclChina = countriesCases.filter(
      (element, index) => index !== chinaIndex
    );
    const colorsArrayExclChina = colors.filter(
      (element, index) => index !== chinaIndex
    );

    const chartData = {
      labels: countriesListExclChina.slice(0, 10),
      datasets: [
        {
          label: 'Confirmed Cases',
          fill: true,
          backgroundColor: colorsArrayExclChina,
          data: countriesDataExclChina.slice(0, 10)
        }
      ]
    };

    setChartDataExclChina(chartData);
  };

  useEffect(() => {
    generateColorsArray();
  }, []);

  useEffect(() => {
    formatDataInclChina();
    formatDataExclChina();
  }, [colorsArray]);

  return (
    <div className='grid-2'>
      <div>
        {chartDataInclChina && (
          <Chart2
            chartData={chartDataInclChina}
            title={'Cases incl. China'}
            showLegend={true}
          />
        )}
      </div>
      <div>
        {chartDataExclChina && (
          <Chart2
            chartData={chartDataExclChina}
            title={'Cases excl. China'}
            showLegend={false}
          />
        )}
      </div>
    </div>
  );
};

export default CasesByCountryChart;
