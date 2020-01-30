const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Vladik'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Vladik'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'Here is the page for help',
        name: 'Vladik'
    })
})

// tell express what to do
app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
}) // configure what server should do
// (route, what to do if someone visits the route)

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: 'Error 404',
        errorMessage: 'Page Not Found'
    })
})

// start the server up
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})