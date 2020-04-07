import axios from 'axios';
import { MOCK_DATA } from '../utils/config';
import mockLocations from './mockdata/mockLocations';
import mockNewCases from './mockdata/mockNewCases';
import mockConfirmed from './mockdata/mockConfirmed';
import mockDeaths from './mockdata/mockDeaths';
import mockUS from './mockdata/mockUS';

// export const getConfirmed = async () => {
//   if (!mockData) {
//     try {
//       const res = await axios.get(`${url}/confirmed`);
//       return res.data;
//     } catch (err) {
//       console.error(err.message);
//     }
//   }
//   console.log('using mock data!');
//   console.log(mockConfirmed);
//   return mockConfirmed;
// };

// export const getDeaths = async () => {
//   if (!mockData) {
//     try {
//       const res = await axios.get(`${url}/deaths`);
//       return res.data;
//     } catch (err) {
//       console.error(err.message);
//     }
//   }
//   console.log('using mock data!');
//   return mockDeaths;
// };

// export const getRecovered = async () => {
//   if (!mockData) {
//     try {
//       const res = await axios.get(`${url}/recovered`);

//       return res.data;
//     } catch (err) {
//       console.error(err.message);
//     }
//   }
//   console.log('using mock data!');
//   return mockRecovered;
// };

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
