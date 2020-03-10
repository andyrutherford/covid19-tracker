import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getConfirmed, getDeaths, getRecovered } from '../utils/fetchData';
import Navbar from '../layout/Navbar';
import ConfirmedCases from '../components/ConfirmedCases';
import DeathCount from '../components/DeathCount';
import RecoveredCount from '../components/RecoveredCount';

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
        <div>
          {confirmed ? (
            <ConfirmedCases confirmedCases={confirmed} />
          ) : (
            <p>Loading confirmed tab...</p>
          )}
        </div>
        <div>
          {deaths ? (
            <DeathCount deathCount={deaths} />
          ) : (
            <p>Loading deaths tab...</p>
          )}
        </div>
        <div>
          {recovered ? (
            <RecoveredCount recoveredCount={recovered} />
          ) : (
            <p>Loading recovered tab...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
