import {LoadingButton} from "@mui/lab";
import { Box, Container, Typography, TextField} from "@mui/material";
import { useState } from "react";
import config from '../config.js';
import axios from 'axios';

const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${config.apiKey}&lang=es&q=`;
//const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=70efb06b74a14d6e96f03513240506&q=`;


export default function App() {
  const [city, setCity] = useState("");
  const [error, setError] = useState({
    error:false,
    message: "",
  });
  const [loading, setLoading] = useState (false);

  const[weather, setWeather]= useState({
    city:"",
    country:"",
    temperature:0,
    condition:"",
    icon:"",
    conditionText:"",
    });
  
  const onSubmit = async(e) => {
      e.preventDefault();
      setError({ error: false, message:""});
      setLoading(true);

      try {
        if (!city.trim()) throw { message: "el campo ciudad es obligatorio"};
        const res = await fetch(API_WEATHER + city);
        const data = await res.json();
          
        if (data.error) {
          throw {message: data.error.message };
        }
        console.log(data);
        setWeather({
          city: data.location.name,
          country: data.location.country,
          temperature: data.current.temp_c,
          condition: data.current.condition.code,
          icon: data.current.condition.icon,
          conditionText: data.current.condition.text,
        });
        const backendRes = await axios.post('http://localhost:5173/',{
          city: data.location.country
        });

        if (backendRes.status !== 201){
          throw new Error ("error al guardar info");
        }
      } catch (error){
        console.log(error);
        setError({error:true, message: error.message || "error desconocido" });
      } finally {
        setLoading(false);
      }
    };
        
  
  return (
    <Container
    maxWidth="xs"
    sx={{mt:2}}
    >
      <Typography
      variant="h3"
      component="h1"
      align="center"
      gutterBottom
      >
        Weather App
      </Typography>
      <Box
      sx={{display:"grid", gap: 2}}
      component="form"
      autoComplete="off"
      onSubmit={onSubmit}
      >
      <TextField 
        id="city"
        label="Ciudad"
        variant="outlined"
        size="small"
        required
        value={city}
        onChange={(e) => setCity(e.target.value)}
        error={error.error}
        helperText={error.message}
        />
      <LoadingButton
      type="submit"
      variant="contained"
      loading={loading} 

      loadingIndicator="cargando..."
      > 
      Buscar
      </LoadingButton>
      </Box>
    
    {weather.city && (
    <Box
      sx={{
          mt:2,
          display:"grid",
          gap: 2,
          textAlign: "center",
    }} 
    >
     <Typography 
     variant="h4" 
     component="h2"
     >
     {weather.city}, {weather.country}
      </Typography>
      <Box 
      component="img"
      alt={weather.conditionText}
      src={weather.icon}
      sx={{margin: "0 auto"}}
      />

      <Typography 
      variant="h5" 
      component="h3"
      >
      {weather.temperature} °C 
      </Typography>

      <Typography 
      variant="h6"
      component="h4"
      >
      {weather.conditionText}
      </Typography>
      </Box>
      )}
      <Typography
      textAlign="center"
      sx={{ mt:2, fontSize: "10px" }}
      >
        Powered by: {" "}
        <a
        href ="https://www.weatherapi.com/"
        title="Weather API" 
        >
          WeatherAPI.com
        </a>
        </Typography>
      </Container>
  );
}

