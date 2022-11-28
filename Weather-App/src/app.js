const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000;

const publicDir = path.join(__dirname, '../public');
const partialsDir = path.join(__dirname, '../views/partials');

app.set('view engine', 'hbs');
hbs.registerPartials(partialsDir);

app.use(express.static(publicDir));


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Ilya Stserbina'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Ilya Stserbina'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Ilya Stserbina'
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    msg: 'Help article was not found...',
    title: '404',
  })
})



app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide an address...'
    });
  };
  geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    };

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      };
      res.send({
        forecast: `${forecastData.weatherDescription}. Currently it is ${forecastData.currentTemperature} degrees Celsius. Feels like ${forecastData.feelsLike} degrees Celsius.`,
        location,
        address: req.query.address,
        icon: forecastData.weatherIcon
      });

    });

  });
});


app.get('*', (req, res) => {
  res.render('404', {
    title: "404",
    msg: "Couldn not find the page",
    name: "Ilya Stserbina"
  });
});


app.listen(port, () => {
  console.log('Connected...');
});

