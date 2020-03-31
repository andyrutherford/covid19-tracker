import React, { useEffect, useState } from 'react';
import { getConfirmed, getDeaths, getUS } from '../utils/fetchData';
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
  const [caseData, setCaseData] = useState({
    confirmed: null,
    deaths: null,
    usData: null,
    timeline: null,
    demographics: null
  });

  useEffect(() => {
    getConfirmed().then(response =>
      setCaseData(prevState => ({ ...prevState, confirmed: response }))
    );
    getDeaths().then(response =>
      setCaseData(prevState => ({ ...prevState, deaths: response }))
    );
    getUS().then(response =>
      setCaseData(prevState => ({ ...prevState, usData: response }))
    );
    getTimeline().then(response =>
      setCaseData(prevState => ({ ...prevState, timeline: response }))
    );
    getDemographics().then(response =>
      setCaseData(prevState => ({ ...prevState, demographics: response }))
    );
  }, []);

  return (
    <div>
      {caseData.confirmed && caseData.deaths && caseData.timeline ? (
        <Navbar lastUpdated={caseData.confirmed.last_updated} />
      ) : (
        <Navbar />
      )}
      {caseData.confirmed &&
      caseData.deaths &&
      caseData.usData &&
      caseData.timeline ? (
        <div>
          <section className='container grid-3-top section-1'>
            <div className='card'>
              <ConfirmedCases confirmedCases={caseData.confirmed} />
            </div>
            <div style={{ zIndex: '0', marginTop: '0.7rem' }}>
              <div style={{ zIndex: '9000', position: 'relative' }}>
                <Search
                  confirmedCases={caseData.confirmed}
                  deathCount={caseData.deaths}
                />
              </div>
              <div
                className='map leaflet-container'
                style={{
                  marginTop: '0.7rem',
                  zIndex: '0'
                }}
              >
                <Map
                  confirmedCases={caseData.confirmed}
                  usData={caseData.usData}
                />
              </div>
            </div>

            <div className='card'>
              <DeathCount deathCount={caseData.deaths} />
            </div>
          </section>
          <div className='container grid-2'>
            <div className='card'>
              <CasesByCountryChart confirmedCases={caseData.confirmed} />
            </div>
            <div className='card'>
              <Chart1
                confirmedCases={caseData.confirmed}
                deathCount={caseData.deaths}
              />
            </div>
          </div>
          <div className='container grid-2'>
            <div>
              <CountriesChart
                confirmedCases={caseData.confirmed}
                deathCount={caseData.deaths}
              />
            </div>
            <div className='card'>
              <Timeline timeline={caseData.timeline} />
            </div>
          </div>
          <div className='container'>
            {caseData.demographics && (
              <DemographicsCharts demographicsData={caseData.demographics} />
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
