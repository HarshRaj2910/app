const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME;

  if (!uri) {
    throw new Error('MONGODB_URI is not set in environment variables');
  }

  mongoose.set('strictQuery', true);

  const options = {};
  if (dbName) {
    options.dbName = dbName;
  }

  await mongoose.connect(uri, options);

  // eslint-disable-next-line no-console
  console.log('MongoDB connected');
}

module.exports = { connectDB };

