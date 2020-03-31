import axios from 'axios';

export const getDemographics = async () => {
  try {
    const res = await axios.get('/api/demographics');
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
