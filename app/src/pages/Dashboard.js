import React, { useEffect, useState } from 'react';
import {
  getLocations,
  getConfirmed,
  getDeaths,
  getUS
} from '../utils/fetchData';
import { getTimeline } from '../utils/fetchTimeline';
import { getDemographics } from '../utils/fetchDemographics';
import SideBar from '../layout/Sidebar';
import Navbar from '../layout/Navbar';
import Spinner from '../layout/Spinner';
import Locations from '../components/Locations';
import Tweets from '../components/Tweets';
import Search from '../components/Search';
import Map from '../components/Map';
import CasesByCountryChart from '../components/charts/CasesByCountryChart';
import Chart1 from '../components/charts/Chart1';
import CountriesChart from '../components/charts/CountriesChart';
import Timeline from '../components/Timeline';
import DemographicsCharts from '../components/charts/DemographicsCharts';

const Dashboard = () => {
  const [caseData, setCaseData] = useState({
    locations: null,
    confirmed: null,
    deaths: null,
    usData: null,
    timeline: null,
    demographics: null
  });

  useEffect(() => {
    getLocations().then(response =>
      setCaseData(prevState => ({ ...prevState, locations: response }))
    );
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
      <SideBar pageWrapId={'page-wrap'} outerContainerId={'App'} />

      {caseData.confirmed && caseData.deaths && caseData.timeline ? (
        <Navbar lastUpdated={caseData.confirmed.last_updated} />
      ) : (
        <Navbar />
      )}
      {caseData.locations &&
      caseData.confirmed &&
      caseData.deaths &&
      caseData.usData &&
      caseData.timeline ? (
        <div>
          <section className='container grid-3-top section-1' id='top'>
            <div className='card'>
              {/* <ConfirmedCases confirmedCases={caseData.confirmed} /> */}
              <Locations locations={caseData.locations} />
            </div>
            <div style={{ zIndex: '0' }}>
              <div
                className='search-box'
                style={{
                  zIndex: '9000',
                  position: 'relative',
                  marginTop: '0.7rem'
                }}
              >
                <Search
                  confirmedCases={caseData.confirmed}
                  deathCount={caseData.deaths}
                />
              </div>
              <div
                className='map leaflet-container'
                id='map'
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

            <div className='card' id='tweets'>
              <Tweets />
            </div>
          </section>
          <section className='container grid-2' id='confirmed-cases'>
            <div className='card'>
              <Chart1
                confirmedCases={caseData.confirmed}
                deathCount={caseData.deaths}
              />
            </div>
            <div className='card'>
              <CasesByCountryChart confirmedCases={caseData.confirmed} />
            </div>
          </section>
          <div className='container grid-2'>
            <div>
              <CountriesChart
                confirmedCases={caseData.confirmed}
                deathCount={caseData.deaths}
              />
            </div>
            <div className='card' id='timeline'>
              <Timeline timeline={caseData.timeline} />
            </div>
          </div>
          <section id='demographics'>
            <div className='container'>
              <h1>Demographics</h1>
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
