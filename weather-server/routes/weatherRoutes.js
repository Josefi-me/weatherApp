import express from 'express';
import Weather from '../models/Weather.js';

const router = express.Router();

// Post a new weather search
router.post('/weather', async (req, res) => {
  const { city, country } = req.body;

  try {
    const newWeather = new Weather({
      city,
      country
    });

    await newWeather.save();
    res.status(201).send('Informacion guardada en la base de datos');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error al guardar los datos');
  }
});

export default router;