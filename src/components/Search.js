import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import SearchResults from './SearchResults';

const Search = ({ confirmedCases, deathCount }) => {
  const [searchState, setSearchState] = useState({
    country: null,
    countryList: null,
    countryData: {
      confirmed: null,
      deaths: null
    }
  });

  const onChange = e => {
    generateSelectedCountryData(e.value);
  };

  const generateCountryList = () => {
    // Get list of countries
    const countriesList = confirmedCases.locations.map(
      element => element.country
    );

    //Remove duplicate countries
    const uniqueCountriesList = [...new Set(countriesList)].sort();
    const final = uniqueCountriesList.map(c => ({
      value: c,
      label: c
    }));

    return final;
  };

  const generateSelectedCountryData = selectedCountry => {
    const countryConfirmed = confirmedCases.locations.filter(
      element => element.country === selectedCountry
    );
    const countryDeaths = deathCount.locations.filter(
      element => element.country === selectedCountry
    );

    setSearchState({
      ...searchState,
      country: selectedCountry,
      countryData: {
        ...searchState.countryData,
        confirmed: countryConfirmed,
        deaths: countryDeaths
      }
    });
  };

  const formatData = () => {
    setSearchState({ ...searchState, countryList: generateCountryList() });
  };

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
              options={searchState.countryList}
              placeholder='Select a country for more information...'
              onChange={e => onChange(e)}
            />
          )}
        </form>
      )}
      {searchState.country && (
        <SearchResults
          selectedCountry={searchState.country}
          data={searchState.countryData}
        />
      )}
    </div>
  );
};

export default Search;
