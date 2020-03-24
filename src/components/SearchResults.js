import React, { useState, useEffect } from 'react';
import Rodal from 'rodal';

const SearchResults = ({ selectedCountry }) => {
  const [showModal, setShowModal] = useState(false);
  const [country, setCountry] = useState(null);

  const onShowModal = () => {
    setShowModal(true);
  };

  const onHideModal = () => {
    setShowModal(false);
  };

  const formatName = () => {
    let displayName = selectedCountry;
    if (selectedCountry === 'US') {
      displayName = 'The United States';
    }
    if (selectedCountry === 'UK') {
      displayName = 'The United Kingdom';
    }
    if (selectedCountry === 'Korea, South') {
      displayName = 'South Korea';
    }
    if (selectedCountry.includes(', ')) {
      const newName = selectedCountry
        .split(', ')
        .reverse()
        .join()
        .replace(',', ' ');
      displayName = newName;
    }
    setCountry(displayName);
  };

  // Show modal when a country is selected
  useEffect(() => {
    onShowModal();
    formatName();
  }, [selectedCountry]);

  return (
    <Rodal visible={showModal} onClose={onHideModal} width={600}>
      <div className='modal'>
        <h2>{country}</h2>
        <p className='small'>Showing country data for {selectedCountry} !</p>
      </div>
    </Rodal>
  );
};

export default SearchResults;
