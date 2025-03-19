const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Load models
const Actionitem = require('./models/Actionitem');

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Read JSON files
const actionitems = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/actionitems.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Actionitem.create(actionitems);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Actionitem.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
