const axios = require('axios');
const express = require('express');
const router = express.Router();

const url = 'https://coronavirus-tracker-api.herokuapp.com/v2/locations';
const url2 = 'https://api.covid19api.com/summary';

// @route       GET api/locations
// @desc        Get cases by location
// @access      Public
router.get('/', async (req, res) => {
  try {
    const confirmed = await axios.get(url);
    res.send(confirmed.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  return res.data;
});

router.get('/new', async (req, res) => {
  try {
    const yesterday = await axios.get(url2);
    const data = yesterday.data.Countries.map((c) => ({
      country: c.Country,
      newConfirmed: c.NewConfirmed,
      newDeaths: c.NewDeaths,
    }));

    const newConfirmed = data.reduce(
      (prev, cur) => (cur.newConfirmed += prev),
      0
    );

    const newDeaths = data.reduce((prev, cur) => (cur.newDeaths += prev), 0);

    const newCases = {
      newConfirmed,
      newDeaths,
    };

    res.send(newCases);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
