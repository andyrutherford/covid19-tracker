import axios from 'axios';
import mockConfirmed from './mockdata/mockConfirmed.json';
import mockDeaths from './mockdata/mockDeaths.json';
import mockRecovered from './mockdata/mockRecovered.json';

const url = 'https://coronavirus-tracker-api.herokuapp.com';

const mockData = false;

// USA specific https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=csbs

export const getConfirmed = async () => {
  if (!mockData) {
    try {
      const res = await axios.get(`${url}/confirmed`);
      return res.data;
    } catch (err) {
      console.error(err.message);
    }
  }
  console.log('using mock data!');
  console.log(mockConfirmed);
  return mockConfirmed;
};

export const getDeaths = async () => {
  if (!mockData) {
    try {
      const res = await axios.get(`${url}/deaths`);
      return res.data;
    } catch (err) {
      console.error(err.message);
    }
  }
  console.log('using mock data!');
  return mockDeaths;
};

export const getRecovered = async () => {
  if (!mockData) {
    try {
      const res = await axios.get(`${url}/recovered`);

      return res.data;
    } catch (err) {
      console.error(err.message);
    }
  }
  console.log('using mock data!');
  return mockRecovered;
};

export const getUS = async () => {
  try {
    const res = await axios.get(
      'https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=csbs'
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err.message);
  }
};
