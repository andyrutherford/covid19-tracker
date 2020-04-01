const express = require('express');
const apicache = require('apicache');
const path = require('path');

const app = express();

let cache = apicache.middleware;

app.use(cache('1 hour'));

// Define Routes
app.use('/api/locations', require('./routes/locations'));
app.use('/api/cases', require('./routes/cases'));
app.use('/api/timeline', require('./routes/timeline'));
app.use('/api/demographics', require('./routes/demographics'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder

  app.use(express.static('app/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'app', 'build', 'index.html'))
  );
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
