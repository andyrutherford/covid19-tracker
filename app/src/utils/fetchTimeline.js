import axios from 'axios';

export const getTimeline = async () => {
  try {
    const res = await axios.get('/api/timeline');
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
