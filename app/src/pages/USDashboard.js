import React, { useEffect, useState } from 'react';
import Locations from '../components/Locations';
import Map from '../components/Map';
import Tweets from '../components/Tweets';
import { formatStateLocations } from '../utils/formatLocations';
import { formatUSMap } from '../utils/formatMap';

const USDashboard = ({ caseData }) => {
  const [locations, setLocations] = useState(null);
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    if (caseData) {
      const locations = formatStateLocations(caseData);
      setLocations(locations);
      const map = formatUSMap(caseData);
      setMapData(map);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      {' '}
      <section className='container grid-3-top-us section-1' id='top'>
        <div className='card'>
          <Locations locations={locations} showFlags={false} />
        </div>

        <div
          className='map leaflet-container'
          id='map'
          style={{
            marginTop: '0.7rem',
            zIndex: '0',
          }}
        >
          <Map mapData={mapData} center={[40, -100]} zoom={4} />
        </div>

        <div className='card' id='tweets'>
          <Tweets source='CDCgov' />
        </div>
      </section>
    </div>
  );
};

export default USDashboard;
