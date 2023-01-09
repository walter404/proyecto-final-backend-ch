import config from '../config/config.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

try {
  //conexion hacia la base de datos
  const URL = config.databaseUrl
  //const URL = process.env.MONGO_URL || 'mongodb://localhost:27017/test'
  mongoose.connect(URL);
  console.log('Base de datos conectada');
} catch (err) {
  console.log(error)
}    