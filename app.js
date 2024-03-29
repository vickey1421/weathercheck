const express = require("express");
const dotenv = require("dotenv");
const https = require("https");
dotenv.config();
const app = express();
//good morning good etm
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

const WeatherAPIkey=process.env.WeatherAPI

app.post("/", (req, res) => {
  const location = req.body.cityName;

  const link =
  "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid="+WeatherAPIkey+"units=metric";
  let weatherData;
  https.get(link, (response) => {
    response.on("data", (data) => {
      weatherData = JSON.parse(data);

      console.log(weatherData);


        const temperature=weatherData.main.temp
        const city= weatherData.name
        const weather=weatherData.weather[0].main
        


      res.render("weatherReport", {temperature, city, weather});

    });

  });

});

app.listen(3000, () => {
  console.log("server is started at 3000");
});
