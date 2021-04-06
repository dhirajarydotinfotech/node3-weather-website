//weather forcast api key aa0d323c72b854fdfb7bc9f0878ff905
const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=aa0d323c72b854fdfb7bc9f0878ff905&query=${lat},${long}&units=m`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to Weather service!", undefined);
        } else if (body.error) {
            callback("Unable to fine location", undefined);
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}.  It is currently ${body.current.temperature} degree out. It feels like ${body.current.feelslike} degress out.`);
        }
    });
}


module.exports = forecast;