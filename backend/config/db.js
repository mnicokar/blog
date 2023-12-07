const DB_URI = process.env.MONGODB_URI;
const mongoose = require('mongoose');


const connectDB = async () => {
    try {
      const conn = await mongoose.connect(DB_URI);
      console.log(`Connected to the database`);
    } catch (error) {
      console.log(`Error: ${error.message}`);
      process.exit(1);
    }
  };
  
  module.exports = connectDB;