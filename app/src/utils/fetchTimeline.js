import axios from 'axios';
import { MOCK_DATA } from '../utils/config';
import mockTimeline from './mockdata/mockTimeline';

export const getTimeline = async () => {
  if (!MOCK_DATA) {
    try {
      const res = await axios.get('/api/timeline');
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
  return mockTimeline;
};
