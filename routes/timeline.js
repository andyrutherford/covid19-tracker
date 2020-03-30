const express = require('express');
const router = express.Router();

// @route       GET api/timeline
// @desc        Get timeline
// @access      Public
router.get('/', (req, res) => {
  res.send('Get timeline....');
});

module.exports = router;
