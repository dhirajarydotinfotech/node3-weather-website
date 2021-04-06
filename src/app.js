const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const hbs = require('hbs');

const app = express();
const address = process.argv[2];



//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Dhiraj Acharya'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Dhiraj Acharya'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'I need help',
        title: 'Help',
        name: 'Dhiraj Acharya'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error: error })
            }
            // console.log(location);
            // console.log(forecastData);
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        });
    });


})


app.get('/products', (req, res) => {
    if (req.query && !req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dhiraj Acharya',
        errorMessage: 'About Article not found'
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dhiraj Acharya',
        errorMessage: 'Help Article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dhiraj Acharya',
        errorMessage: 'Page not found.'
    })
})

app.listen(3001, () => {
    console.log('Server is up on port 3001');
});

