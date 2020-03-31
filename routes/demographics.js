const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const router = express.Router();

const url =
  'https://api.allorigins.win/raw?url=https://www.worldometers.info/coronavirus/coronavirus-age-sex-demographics/';

// @route       GET api/demographics
// @desc        Get demographics
// @access      Public
router.get('/', (req, res) => {
  try {
    axios.get(url).then(response => {
      const $ = cheerio.load(response.data);

      const formatAgeData = $ => {
        const byAgeRows = $('h4:contains("COVID-19 Fatality Rate by AGE:")')
          .next()
          .next()
          .find('table tbody tr');
        const byAge = [];
        $(byAgeRows).each((idx, el) => {
          if (idx === 0) return;

          byAge.push({
            age: $(el)
              .children('td')
              .eq(0)
              .text()
              .trim(),
            rate: $(el)
              .children('td')
              .eq(2)
              .text()
              .trim()
          });
        });
        return byAge;
      };

      const formatSexData = $ => {
        const bySexRows = $('h4:contains("COVID-19 Fatality Rate by SEX:")')
          .next()
          .next()
          .find('table tbody tr');
        const bySex = [];
        $(bySexRows).each((idx, el) => {
          if (idx === 0) return;

          bySex.push({
            sex: $(el)
              .children('td')
              .eq(0)
              .text()
              .trim(),
            rate: $(el)
              .children('td')
              .eq(1)
              .text()
              .trim()
          });
        });
        return bySex;
      };

      const formatPreexistingConditionsData = $ => {
        const byComorbidityRows = $(
          'h4:contains("COVID-19 Fatality Rate by COMORBIDITY:")'
        )
          .next()
          .next()
          .find('table tbody tr');
        const byComorbidity = [];
        $(byComorbidityRows).each((idx, el) => {
          if (idx === 0) return;

          byComorbidity.push({
            preExistingCondition: $(el)
              .children('td')
              .eq(0)
              .text()
              .trim(),
            rate: $(el)
              .children('td')
              .eq(2)
              .text()
              .trim()
          });
        });
        return byComorbidity;
      };

      const demographicsData = {
        age: formatAgeData($),
        sex: formatSexData($),
        preexistingConditions: formatPreexistingConditionsData($)
      };

      res.send(demographicsData);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  return res.data;
});

module.exports = router;
