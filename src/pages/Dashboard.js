import React, { useEffect, useState } from 'react';
import { getConfirmed, getDeaths, getRecovered } from '../utils/fetchData';
import Navbar from '../layout/Navbar';
import Spinner from '../layout/Spinner';
import ConfirmedCases from '../components/ConfirmedCases';
import DeathCount from '../components/DeathCount';
import RecoveredCount from '../components/RecoveredCount';
import Chart1 from '../components/charts/Chart1';
import Chart2 from '../components/charts/Chart2';

const Dashboard = () => {
  const [confirmed, setConfirmed] = useState(null);
  const [deaths, setDeaths] = useState(null);
  const [recovered, setRecovered] = useState(null);

  useEffect(() => {
    getConfirmed().then(response => setConfirmed(response));
    getDeaths().then(response => setDeaths(response));
    getRecovered().then(response => setRecovered(response));
  }, []);

  return (
    <div>
      {confirmed ? <Navbar lastUpdated={confirmed.last_updated} /> : <Navbar />}
      <div className='container grid-3'>
        <div className='card'>
          {confirmed ? (
            <ConfirmedCases confirmedCases={confirmed} />
          ) : (
            <Spinner />
          )}
        </div>
        <div className='card'>
          {deaths ? <DeathCount deathCount={deaths} /> : <Spinner />}
        </div>
        <div className='card'>
          {recovered ? (
            <RecoveredCount recoveredCount={recovered} />
          ) : (
            <Spinner />
          )}
        </div>
      </div>
      <div className='container grid-2'>
        <div className='card'>
          {confirmed && deaths ? (
            <Chart1 confirmedCases={confirmed} deathCount={deaths} />
          ) : (
            <Spinner />
          )}
        </div>
        <div className='card'>
          {confirmed ? <Chart2 confirmedCases={confirmed} /> : <Spinner />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
