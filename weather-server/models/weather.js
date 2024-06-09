import mongoose from 'mongoose';

const weatherSchema = new mongoose.Schema({
  city: { type: String, required: true },
  country: { type: String, required: true }
});
const Weather = mongoose.model('Weather', weatherSchema)

export default Weather;