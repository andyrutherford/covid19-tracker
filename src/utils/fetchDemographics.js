import axios from 'axios';

const url =
  'https://api.allorigins.win/raw?url=https://www.worldometers.info/coronavirus/coronavirus-age-sex-demographics/';

export const getDemographics = async () => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
