import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const Search = ({ confirmedCases, addCountry, defaults }) => {
  const [searchState, setSearchState] = useState({
    countryList: null,
  });

  const onChange = (option) => {
    addCountry(option);
  };

  const generateCountryList = () => {
    // Get list of countries
    const countriesList = confirmedCases.locations.map(
      (element) => element.country
    );

    //Remove duplicate countries
    const uniqueCountriesList = [...new Set(countriesList)].sort();
    const final = uniqueCountriesList.map((c) => ({
      value: c,
      label: c,
    }));

    return final;
  };

  const formatData = () => {
    setSearchState({ ...searchState, countryList: generateCountryList() });
  };

  // const [locationList, setLocationList] = useState({
  //   locations: null,
  // });

  // const formatData = () => {
  //   const data = locations.locations.map((location) => ({
  //     value: location.country,
  //     label: location.country,
  //     country:
  //       location.country === 'US'
  //         ? 'United States'
  //         : location.country === 'Korea, South'
  //         ? 'South Korea'
  //         : location.country,
  //     country_code:
  //       location.country_code === 'XK' || location.country_code === 'XX'
  //         ? 'un'
  //         : location.country_code.toLowerCase(),
  //     confirmed: location.latest.confirmed,
  //     deaths: location.latest.deaths,
  //   }));

  //   // Consolidate duplicates
  //   var output = data.reduce(function (accumulator, cur) {
  //     var country = cur.country,
  //       found = accumulator.find(function (elem) {
  //         return elem.country === country;
  //       });
  //     if (found) {
  //       found.confirmed += cur.confirmed;
  //       found.deaths += cur.deaths;
  //     } else accumulator.push(cur);
  //     return accumulator;
  //   }, []);

  //   // Sort and remove any countries with less than 100 cases
  //   const final = output
  //     .sort((a, b) => b.confirmed - a.confirmed)
  //     .filter((element) => element.confirmed > 100);

  //   setLocationList({
  //     ...locationList,
  //     locations: final,
  //   });
  // };

  useEffect(() => {
    formatData();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      {searchState.countryList && (
        <form>
          {searchState.countryList && (
            <Select
              defaultValue={defaults}
              options={searchState.countryList}
              placeholder='Select a country for more information...'
              onChange={onChange}
              isMulti={true}
            />
          )}
        </form>
      )}
    </div>
  );
};

export default Search;
