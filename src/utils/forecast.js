const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=9a4a4e2a581ae2f5b933c39a0633b116`
    request({ url: url, json: true }, (err, res) => {
        if(err){
            callback('Couldnt retreive weather', undefined)
           
        }else if(res){
            weatherData = res.body
            callback(undefined, weatherData)
        }      
    })
}


module.exports = forecast