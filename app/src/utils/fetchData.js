import axios from 'axios';
import { MOCK_DATA } from '../utils/config';
import mockLocations from './mockdata/mockLocations';
import mockNewCases from './mockdata/mockNewCases';
import mockConfirmed from './mockdata/mockConfirmed';
import mockDeaths from './mockdata/mockDeaths';
import mockUS from './mockdata/mockUS';

export const getLocations = async () => {
  if (!MOCK_DATA) {
    try {
      const res = await axios.get('/api/locations');
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
  console.log('using mock data!');
  return mockLocations;
};

export const getNewCases = async () => {
  if (!MOCK_DATA) {
    try {
      const res = await axios.get('/api/locations/new');
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
  return mockNewCases;
};

export const getConfirmed = async () => {
  if (!MOCK_DATA) {
    try {
      const res = await axios.get('/api/cases/confirmed');
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
  return mockConfirmed;
};

export const getDeaths = async () => {
  if (!MOCK_DATA) {
    try {
      const res = await axios.get('/api/cases/deaths');
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
  return mockDeaths;
};

export const getUS = async () => {
  if (!MOCK_DATA) {
    try {
      const res = await axios.get('/api/cases/usa');
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
  return mockUS;
};
