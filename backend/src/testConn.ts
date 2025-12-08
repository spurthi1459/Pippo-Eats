import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pippoeats';

(async function () {
  try {
    // short timeout so it fails fast if unreachable
    await mongoose.connect(MONGO, { serverSelectionTimeoutMS: 5000 });
    console.log('MONGO CONNECTED OK:', MONGO);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err: any) {
    console.error('MONGO CONNECT ERROR:', err && err.message ? err.message : err);
    process.exit(1);
  }
})();
