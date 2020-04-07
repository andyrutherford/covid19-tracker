import axios from 'axios';
import { MOCK_DATA } from '../utils/config';
import mockDemographics from './mockdata/mockDemographics';

export const getDemographics = async () => {
  if (!MOCK_DATA) {
    try {
      const res = await axios.get('/api/demographics');
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
  return mockDemographics;
};
