import React, { useEffect, useState } from 'react';
import { formatCountryLocations } from '../utils/formatLocations';
import { formatWorldMap } from '../utils/formatMap';
import Spinner from '../layout/Spinner';
import Locations from '../components/Locations';
import Tweets from '../components/Tweets';
import Map from '../components/Map';
import NewCasesChart from '../components/charts/NewCasesChart';
import NewDeathsChart from '../components/charts/NewDeathsChart';
import Chart1 from '../components/charts/Chart1';
import CountriesChart from '../components/charts/CountriesChart';
import DemographicsCharts from '../components/charts/DemographicsCharts';

/* Disabled Components */
// import { getTimeline } from '../utils/fetchTimeline';
// import Timeline from '../components/Timeline';
// import CasesByCountryChart from '../components/charts/CasesByCountryChart';

const Dashboard = ({ caseData }) => {
  const [locations, setLocations] = useState(null);
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    if (caseData) {
      const locations = formatCountryLocations(caseData.locations);
      setLocations(locations);
      const map = formatWorldMap(caseData.confirmed, caseData.usData);
      setMapData(map);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      {caseData.locations &&
      caseData.newCases &&
      caseData.confirmed &&
      caseData.deaths &&
      caseData.usData &&
      caseData.timeline ? (
        <div>
          <section className='container grid-3-top section-1' id='top'>
            <div className='card'>
              {locations && <Locations locations={locations} />}
            </div>
            <div style={{ zIndex: '0' }}>
              <div
                className='map leaflet-container'
                id='map'
                style={{
                  marginTop: '0.7rem',
                  zIndex: '0',
                }}
              >
                {/* <Map
                  confirmedCases={caseData.confirmed}
                  usData={caseData.usData}
                /> */}
                <Map mapData={mapData} center={[28, 0]} zoom={2} />
              </div>
            </div>
            <div className='card' id='tweets'>
              <Tweets source='who' />
            </div>
          </section>
          <section id='worldwide-infections'>
            <div className='container'>
              <div className='card'>
                <h1 className='text-primary'>Worldwide Infections</h1>
                <div className='grid-3'>
                  <div>
                    <Chart1
                      confirmedCases={caseData.confirmed}
                      deathCount={caseData.deaths}
                    />
                  </div>
                  <div>
                    {/* <CasesByCountryChart confirmedCases={caseData.confirmed} /> */}
                    <NewCasesChart confirmedCases={caseData.confirmed} />
                  </div>
                  <div>
                    <NewDeathsChart deathCount={caseData.deaths} />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id='countrywide-infections'>
            <div className='container'>
              <CountriesChart
                confirmedCases={caseData.confirmed}
                deathCount={caseData.deaths}
              />

              {/* <div className='card' id='timeline'>
              <Timeline timeline={caseData.timeline} />
              </div> */}
            </div>
          </section>
          <section id='demographics'>
            <div className='container'>
              {caseData.demographics && (
                <DemographicsCharts demographicsData={caseData.demographics} />
              )}
            </div>
          </section>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Dashboard;
