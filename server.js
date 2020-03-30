const express = require('express');

const app = express();

app.get('/', (req, res) => res.json({ msg: 'Response...' }));

// Define Routes
app.use('/api/cases', require('./routes/cases'));
app.use('/api/timeline', require('./routes/timeline'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
