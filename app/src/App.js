import React, { useEffect, useState, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import USDashboard from './pages/USDashboard';
import Navbar from './layout/Navbar';
import {
  getLocations,
  getNewCases,
  getConfirmed,
  getDeaths,
  getUS,
} from './utils/fetchData';
import { getTimeline } from './utils/fetchTimeline';
import { getDemographics } from './utils/fetchDemographics';

function App() {
  const [caseData, setCaseData] = useState({
    newCases: null,
    locations: null,
    confirmed: null,
    deaths: null,
    usData: null,
    timeline: null,
    demographics: null,
  });

  const {
    newCases,
    locations,
    confirmed,
    deaths,
    usData,
    timeline,
    demographics,
  } = caseData;

  useEffect(() => {
    getLocations().then((response) =>
      setCaseData((prevState) => ({ ...prevState, locations: response }))
    );
    getNewCases().then((response) =>
      setCaseData((prevState) => ({ ...prevState, newCases: response }))
    );
    getConfirmed().then((response) =>
      setCaseData((prevState) => ({ ...prevState, confirmed: response }))
    );
    getDeaths().then((response) =>
      setCaseData((prevState) => ({ ...prevState, deaths: response }))
    );
    getUS().then((response) =>
      setCaseData((prevState) => ({ ...prevState, usData: response }))
    );
    getTimeline().then((response) =>
      setCaseData((prevState) => ({ ...prevState, timeline: response }))
    );
    getDemographics().then((response) =>
      setCaseData((prevState) => ({ ...prevState, demographics: response }))
    );
  }, []);

  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Switch>
          {newCases &&
            locations &&
            confirmed &&
            deaths &&
            usData &&
            timeline &&
            demographics && (
              <Route
                exact
                path='/'
                render={(props) => <Dashboard {...props} caseData={caseData} />}
              />
            )}
          {newCases &&
            locations &&
            confirmed &&
            deaths &&
            usData &&
            timeline &&
            demographics && (
              <Route
                exact
                path='/united-states'
                render={(props) => (
                  <USDashboard
                    {...props}
                    caseData={caseData.usData}
                    orig={caseData}
                  />
                )}
              />
            )}
          )}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
