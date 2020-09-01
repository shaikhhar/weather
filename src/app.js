const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const port = process.env.PORT || 3000

const app = express()

const publicDirPath= path.join(__dirname,'../public')

const viewsPath = path.join(__dirname, '../views/templates')
const partialsPath = path.join(__dirname, '../views/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve 
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Shekhar Basnet'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        description: 'Weather app',
        name: 'Shekhar Basnet'

    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'help',
        name: 'Shekhar Basnet'

    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({Error: 'No address provided'})
    }

    //default param to data is empty object
    geocode(req.query.address, (error, data={}) => {
        if (error) {
            return res.send({error: error})
        }
        console.log('no error on geocode')
        forecast(data.latitude, data.longitude, (error, response) => {
            if(error){
                return res.send({error: 'No weather found 1'})
            }
            if(!response){
                return res.send({error: 'No weather found 2'})
            }
            res.send({
                forecast: response.main,
                description: response.weather[0].description,
                location: data.location,
                address: req.query.address
            })
        })    
    }) 
})

app.get('*', (req, res)=>{
    res.send('<h1>Page not found</h1')
})

app.listen(port,()=>{
    console.log('listening on port http://localhost:'+port);
})
