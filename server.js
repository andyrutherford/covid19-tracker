const express = require('express');
const apicache = require('apicache');

const app = express();

let cache = apicache.middleware;

app.use(cache('1 hour'));

// Define Routes
app.use('/api/cases', require('./routes/cases'));
app.use('/api/timeline', require('./routes/timeline'));
app.use('/api/demographics', require('./routes/demographics'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
