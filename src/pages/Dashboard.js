import React, { useEffect, useState } from 'react';
import { getConfirmed, getDeaths, getRecovered } from '../utils/fetchData';
import { getTimeline } from '../utils/fetchTimeline';
import { getDemographics } from '../utils/fetchDemographics';
import Navbar from '../layout/Navbar';
import Spinner from '../layout/Spinner';
import ConfirmedCases from '../components/ConfirmedCases';
import DeathCount from '../components/DeathCount';
import Search from '../components/Search';
import Map from '../components/Map';
import CasesByCountryChart from '../components/charts/CasesByCountryChart';
import Chart1 from '../components/charts/Chart1';
import CountriesChart from '../components/charts/CountriesChart';
import Timeline from '../components/Timeline';
import DemographicsCharts from '../components/charts/DemographicsCharts';

const Dashboard = () => {
  const [confirmed, setConfirmed] = useState(null);
  const [deaths, setDeaths] = useState(null);
  const [recovered, setRecovered] = useState(null);
  const [timeline, setTimeline] = useState(null);
  const [demographics, setDemographics] = useState(null);

  useEffect(() => {
    getConfirmed().then(response => setConfirmed(response));
    getDeaths().then(response => setDeaths(response));
    getRecovered().then(response => setRecovered(response));
    getTimeline().then(response => setTimeline(response));
    getDemographics().then(response => setDemographics(response));
  }, []);

  return (
    <div>
      {confirmed && deaths && recovered && timeline ? (
        <Navbar lastUpdated={confirmed.last_updated} />
      ) : (
        <Navbar />
      )}
      {confirmed && deaths && recovered && timeline ? (
        <div>
          <section className='container grid-3-top section-1'>
            <div className='card'>
              <ConfirmedCases confirmedCases={confirmed} />
            </div>
            <div style={{ zIndex: '0', marginTop: '0.7rem' }}>
              <div style={{ zIndex: '9000', position: 'relative' }}>
                <Search
                  confirmedCases={confirmed}
                  deathCount={deaths}
                  recoveredCount={recovered}
                />
              </div>
              <div
                className='map leaflet-container'
                style={{
                  marginTop: '0.7rem',
                  zIndex: '0'
                }}
              >
                <Map confirmedCases={confirmed} />
              </div>
            </div>

            <div className='card'>
              <DeathCount deathCount={deaths} />
            </div>
          </section>
          <div className='container grid-2'>
            <div className='card'>
              <CasesByCountryChart confirmedCases={confirmed} />
            </div>
            <div className='card'>
              <Chart1
                confirmedCases={confirmed}
                deathCount={deaths}
                recoveredCount={recovered}
              />
            </div>
          </div>
          <div className='container grid-2'>
            <div>
              <CountriesChart confirmedCases={confirmed} deathCount={deaths} />
            </div>
            <div className='card'>
              <Timeline timeline={timeline} />
            </div>
          </div>
          <div className='container'>
            {demographics && (
              <DemographicsCharts demographicsData={demographics} />
            )}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Dashboard;
