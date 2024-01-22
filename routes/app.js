const express = require('express');
const path = require('path');
const app = express();
const weatherRouter = require('./weather');

app.use(express.static(path.join(__dirname, '../public')));

app.use('/weather', weatherRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
