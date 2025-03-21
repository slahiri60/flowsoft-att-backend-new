const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.set('strictQuery', false);
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);

  console.log('MongoDB Connected');
};

module.exports = connectDB;
