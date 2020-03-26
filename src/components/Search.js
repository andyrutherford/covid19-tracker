import React, { useEffect, useState } from 'react';
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
    generateSelectedCountryData(e.target.value);
  };

  const generateCountryList = () => {
    // Get list of countries
    const countriesList = confirmedCases.locations.map(
      element => element.country
    );

    //Remove duplicate countries
    const uniqueCountriesList = [...new Set(countriesList)].sort();

    return uniqueCountriesList;
  };

  const generateSelectedCountryData = selectedCountry => {
    console.log('generate country data for ', selectedCountry);
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
  }, []);

  return (
    <div>
      {searchState.countryList && (
        <form>
          <select onChange={onChange} defaultValue={'default'}>
            <option value='default' disabled>
              Select a country for more information
            </option>
            {searchState.countryList.map((country, index) => {
              return (
                <option key={index} value={country}>
                  {country}
                </option>
              );
            })}
          </select>
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
