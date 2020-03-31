const axios = require('axios');
const express = require('express');
const router = express.Router();

const url = 'https://coronavirus-tracker-api.herokuapp.com';
const us =
  'https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=csbs';

// @route       GET api/cases/confirmed
// @desc        Get confirmed cases
// @access      Public
router.get('/confirmed', async (req, res) => {
  try {
    const confirmed = await axios.get(`${url}/confirmed`);
    res.send(confirmed.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  return res.data;
});

// @route       GET api/cases/deaths
// @desc        Get deaths
// @access      Public
router.get('/deaths', async (req, res) => {
  try {
    const deaths = await axios.get(`${url}/deaths`);
    res.send(deaths.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       GET api/cases/recovered
// @desc        Get recovered
// @access      Public
router.get('/recovered', async (req, res) => {
  try {
    const recovered = await axios.get(`${url}/recovered`);
    res.send(recovered.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       GET api/cases/usa
// @desc        Get case data for United States
// @access      Public
router.get('/usa', async (req, res) => {
  try {
    const usData = await axios.get(us);
    res.send(usData.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// export const getUS = async () => {
//   try {
//     const res = await axios.get(
//       'https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=csbs'
//     );
//     return res.data;
//   } catch (err) {
//     console.error(err.message);
//   }
// };

module.exports = router;
