const axios = require('axios');
const express = require('express');
const router = express.Router();

const url = 'https://coronavirus-tracker-api.herokuapp.com/v2/locations';

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

module.exports = router;
