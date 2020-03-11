import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getConfirmed, getDeaths, getRecovered } from '../utils/fetchData';
import Navbar from '../layout/Navbar';
import ConfirmedCases from '../components/ConfirmedCases';
import DeathCount from '../components/DeathCount';
import RecoveredCount from '../components/RecoveredCount';
import ConfirmedChart from '../components/charts/ConfirmedChart';
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
      <Navbar />
      <div className='container grid-3'>
        <div className='card'>
          {confirmed ? (
            <ConfirmedCases confirmedCases={confirmed} />
          ) : (
            <p>Loading confirmed tab...</p>
          )}
        </div>
        <div className='card'>
          {deaths ? (
            <DeathCount deathCount={deaths} />
          ) : (
            <p>Loading deaths tab...</p>
          )}
        </div>
        <div className='card'>
          {recovered ? (
            <RecoveredCount recoveredCount={recovered} />
          ) : (
            <p>Loading recovered tab...</p>
          )}
        </div>
      </div>
      <div className='container grid-2'>
        <div className='card'>
          {confirmed ? (
            <ConfirmedChart confirmedCases={confirmed} />
          ) : (
            <p>Loading confirmed chart...</p>
          )}
        </div>
        <div className='card'>
          {confirmed ? (
            <Chart2 confirmedCases={confirmed} />
          ) : (
            <p>Loading chart 2...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
