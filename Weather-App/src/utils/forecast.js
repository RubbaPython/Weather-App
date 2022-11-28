const request = require('request');
const weatherToken = require('./tokens')


const forecast = (lat, lon, callback) => {
  const url = `https://api.weatherstack.com/current?access_key=${weatherToken.weatherToken}&query=${lat},${lon}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect...')
    }
    else if (body.error) {
      callback("Unable to find location...")
    }
    else {
      callback(undefined, {
        weatherDescription: body.current.weather_descriptions[0],
        currentTemperature: body.current.temperature,
        feelsLike: body.current.feelslike,
        weatherIcon: body.current.weather_icons[0]
      })


    }
  })

}

module.exports = forecast;