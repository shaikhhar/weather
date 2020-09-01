const request = require('request')


const geocode = (address, callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2hla2hhcmJhc25ldCIsImEiOiJja2U0N3diZHQwN3dhMnhvZ2dweWZoZnJ6In0.AFADHHsz31OMpAjntUcXVQ`
    request({ url: url, json: true }, (err, res) => {
        if (err) {
            return  callback('unable to retrieve location', undefined)
        }
        else {
            if(res.body.features.length === 0){
              return  callback('noplace', undefined)
            }
           const {center, place_name} = res.body.features[0]
           
            callback(undefined, {
            latitude: center[1],
            longitude: center[0],
            location: place_name,
             })
        }})
}

geocode('adfadsfadsf',(error, response)=>{
    if(error){
        console.log('error',error)
    }else if(response){
        console.log('response',response)
    }
})

module.exports = geocode;