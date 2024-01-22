// server/app.js
const express = require('express');
const path = require('path');
const app = express();
const weatherRouter = require('./weather');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

app.use('/weather', weatherRouter);

// Update the route handler for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
