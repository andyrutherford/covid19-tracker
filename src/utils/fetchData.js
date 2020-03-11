import axios from 'axios';
import mockConfirmed from './mockdata/mockConfirmed.json';
import mockDeaths from './mockdata/mockDeaths.json';
import mockRecovered from './mockdata/mockRecovered.json';

const url = 'https://coronavirus-tracker-api.herokuapp.com';

const mockData = false;

export const getConfirmed = async () => {
  if (!mockData) {
    try {
      const res = await axios.get(`${url}/confirmed`);
      console.log('confirmed: ', res.data);
      return res.data;
    } catch (err) {
      console.error(err.message);
    }
  }
  return mockConfirmed;
};

export const getDeaths = async () => {
  if (!mockData) {
    try {
      const res = await axios.get(`${url}/deaths`);
      console.log('deaths: ', res.data);
      return res.data;
    } catch (err) {
      console.error(err.message);
    }
  }
  return mockDeaths;
};

export const getRecovered = async () => {
  return mockRecovered;
};
