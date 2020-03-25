import React, { useState, useEffect } from 'react';
import Rodal from 'rodal';
import FlagIcon from '../components/FlagIcon';
import ModalChart1 from '../components/charts/ModalChart1';

const SearchResults = ({ selectedCountry, data }) => {
  const [showModal, setShowModal] = useState(false);
  const [country, setCountry] = useState(null);
  const [countryData, setCountryData] = useState({
    confirmed: null,
    deaths: null,
    recovered: null
  });

  const onShowModal = () => {
    setShowModal(true);
  };

  const onHideModal = () => {
    setShowModal(false);
  };

  const formatName = () => {
    let displayName = selectedCountry;

    if (selectedCountry === 'United Kingdom') {
      displayName = 'The United Kingdom';
    }
    if (selectedCountry === 'United Arab Emirates') {
      displayName = 'The United Arab Emirates';
    }
    if (selectedCountry === 'US') {
      displayName = 'The United States';
    }
    if (selectedCountry === 'Korea, South') {
      displayName = 'South Korea';
    }
    if (selectedCountry.includes('*')) {
      displayName = selectedCountry.replace('*', '');
    }
    if (selectedCountry.includes(', ')) {
      displayName = selectedCountry
        .split(', ')
        .reverse()
        .join()
        .replace(',', ' ');
    }
    setCountry(displayName);
  };

  const generateCountryData = () => {
    const confirmedLatest = data.confirmed.reduce(
      (prev, cur) => prev + cur.latest,
      0
    );
    const deathsLatest = data.deaths.reduce(
      (prev, cur) => prev + cur.latest,
      0
    );
    const recoveredLatest = data.recovered.reduce(
      (prev, cur) => prev + cur.latest,
      0
    );
    setCountryData({
      ...countryData,
      confirmed: confirmedLatest,
      deaths: deathsLatest,
      recovered: recoveredLatest
    });
  };

  // Show modal when a country is selected
  useEffect(() => {
    onShowModal();
    formatName();
    generateCountryData();
    //eslint-disable-next-line
  }, [selectedCountry]);

  return (
    <Rodal visible={showModal} onClose={onHideModal} width={1000} height={460}>
      <div className='modal'>
        <h1 className='large'>{country}</h1>
        <div className='container grid-2'>
          <div>
            <p className='medium'>{countryData.confirmed} confirmed cases</p>
            <p className='medium'>{countryData.deaths} deaths</p>
          </div>
          <div>
            <ModalChart1
              confirmedCases={data.confirmed}
              deathCount={data.deaths}
              recoveredCount={data.recovered}
            />{' '}
          </div>
        </div>
      </div>
    </Rodal>
  );
};

export default SearchResults;
