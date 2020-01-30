const request = require('request')

// const forecast = (latitude, longitude, callback) => {
//     const url = 'https://api.darksky.net/forecast/0a3433f85c32321a27ab8fd5470b58d7/' + latitude + ',' + longitude + '?units=si'

//     request({ url, json: true }, (error, { body }) => {
        
//         if (error) {
//             callback('Unable to connect to the server', undefined)
//         } else if (body.error) {
//             callback('Error in coordinates')
//         } else {
//             const summary = body.daily.data[0].summary
//             const temperature = body.currently.temperature 
//             const precipProbability = body.currently.precipProbability
//             callback(undefined, {
                
//                 summary,
//                 temperature,
//                 precipProbability
//             })
//         }
//     })
// }

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/0a3433f85c32321a27ab8fd5470b58d7/' + latitude + ',' + longitude + '?units=si'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast