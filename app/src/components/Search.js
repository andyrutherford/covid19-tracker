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
