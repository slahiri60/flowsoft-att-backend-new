const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.get('/api/v1/actionitems', (req, res) => {
  res.status(200).json({ success: true, msg: 'Show all action items' });
});

app.get('/api/v1/actionitems/:id', (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Show action item ${req.params.id}` });
});

app.post('/api/v1/actionitems', (req, res) => {
  res.status(200).json({ success: true, msg: 'Create new action item' });
});

app.put('/api/v1/actionitems/:id', (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Update action item ${req.params.id}` });
});

app.delete('/api/v1/actionitems/:id', (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete action item ${req.params.id}` });
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
