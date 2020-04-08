const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const router = express.Router();

const timelineUrl =
  'https://bnonews.com/index.php/2020/02/the-latest-coronavirus-cases/';

// @route       GET api/timeline
// @desc        Get timeline
// @access      Public
router.get('/', async (req, res) => {
  try {
    const timeline = await axios.get(timelineUrl);
    let $ = cheerio.load(timeline.data);
    const data = [];
    $('h2:contains("Timeline for major updates (GMT)")')
      .nextUntil('h3')
      .each((idx, el) => {
        if (el.name === 'h4') {
          const obj = {
            date: $(el).text().trim(),
            time: $(el)
              .next()
              .children('li')
              .toArray()
              .map((li) => ({
                time_and_description: $(li)
                  .text()
                  .trim()
                  .replace(' (Source)', ''),
                source: $(li).find('a').attr('href'),
              })),
          };

          data.push(obj);
        }
      });
    res.send(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
