const axios = require('axios');
const express = require('express');
const router = express.Router();

const url = 'https://coronavirus-tracker-api.herokuapp.com';

// @route       GET api/cases/confirmed
// @desc        Get confirmed cases
// @access      Public
router.get('/confirmed', async (req, res) => {
  res.send('Get confirmed cases...');
  try {
    const res = await axios.get(`${url}/confirmed`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       GET api/cases/deaths
// @desc        Get deaths
// @access      Public
router.get('/deaths', async (req, res) => {
  res.send('Get deaths...');
  try {
    const res = await axios.get(`${url}/deaths`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       GET api/cases/recovered
// @desc        Get recovered
// @access      Public
router.get('/recovered', async (req, res) => {
  res.send('Get recovered...');
  try {
    const res = await axios.get(`${url}/recovered`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
