const express = require('express');
const dotenv = require('dotenv');

// Route files
const actionitems = require('./routes/actionitems');

// Load enviroment variables
dotenv.config();

const app = express();

// Mount routers
app.use('/api/v1/actionitems', actionitems);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
