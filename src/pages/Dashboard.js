import React, { useEffect, useState } from 'react';
import { getConfirmed, getDeaths, getRecovered } from '../utils/fetchData';
import { getTimeline } from '../utils/fetchTimeline';
import Navbar from '../layout/Navbar';
import Spinner from '../layout/Spinner';
import ConfirmedCases from '../components/ConfirmedCases';
import DeathCount from '../components/DeathCount';
import RecoveredCount from '../components/RecoveredCount';
import Map from '../components/Map';
import CasesByCountryChart from '../components/charts/CasesByCountryChart';
import Chart1 from '../components/charts/Chart1';
import Timeline from '../components/Timeline';

const Dashboard = () => {
  const [confirmed, setConfirmed] = useState(null);
  const [deaths, setDeaths] = useState(null);
  const [recovered, setRecovered] = useState(null);
  const [timeline, setTimeline] = useState(null);

  useEffect(() => {
    getConfirmed().then(response => setConfirmed(response));
    getDeaths().then(response => setDeaths(response));
    getRecovered().then(response => setRecovered(response));
    getTimeline().then(response => setTimeline(response));
  }, []);

  return (
    <div>
      {confirmed ? <Navbar lastUpdated={confirmed.last_updated} /> : <Navbar />}
      {/*{confirmed && deaths && recovered ? (
        <div>
          <section className='container grid-4 section-1'>
            <div className='card'>
              <ConfirmedCases confirmedCases={confirmed} />
            </div>

            <div
              className='map leaflet-container'
              style={{ marginTop: '0.7rem', zIndex: '0' }}
            >
              <Map confirmedCases={confirmed} />
            </div>

            <div className='card'>
              <DeathCount deathCount={deaths} />
            </div>
            <div className='card'>
              <RecoveredCount recoveredCount={recovered} />
            </div>
          </section>
          <div className='container grid-2'>
            <div className='card'>
              {confirmed && deaths && recovered ? (
                <Chart1
                  confirmedCases={confirmed}
                  deathCount={deaths}
                  recoveredCount={recovered}
                />
              ) : (
                <Spinner />
              )}
            </div>
            <div className='card'>
              {confirmed ? (
                <CasesByCountryChart confirmedCases={confirmed} />
              ) : (
                <Spinner />
              )}
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )} */}
      <div className='container'>
        {timeline ? <Timeline timeline={timeline} /> : <Spinner />}
      </div>
    </div>
  );
};

export default Dashboard;
