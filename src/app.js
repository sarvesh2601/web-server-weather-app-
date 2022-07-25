const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


const viewsPath = path.join(__dirname, '../template/views')   //you are telling express about this address
const partialsPath = path.join(__dirname, '../template/partials')  //you are telling express anout this address

//seting up static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) //partials are something you can use throughout your application

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Sarvesh'
    })
})

app.get('/About', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Sarvesh'
    })
})

app.get('/Help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        name: 'Sarvesh',
        Email: 'dummy331@gmail.com',
        contact: '1234567890'
    })
})
app.get('/weather', (req, res)=>{

    if(req.query.address == undefined){
        return res.send({
            errorMSG: 'Address not provided'
        })
    }

  geocode(req.query.address, (error, responseG) =>{
    if(responseG == undefined){
        return res.send({
            error: 'Error'
        });
    }
    forecast(responseG.latitude, responseG.longitude, (error, responseF)=>{
        if(error){
            return res.send({
                error: 'error occured'
            })
        }
        res.send({
            Location: responseG.location,
            Temperature: responseF.temp,
            WindSpeed: responseF.windSpeed,
            FeelLike: responseF.feelLike,
            ChanceOfRain: responseF.chanceOfRain
        })
    })
  })
})

app.get('/Help/*', (req, res)=>{
    res.render('404.hbs', {
        name: 'Sarvesh',
        title: '404',
        errorMessage: 'Help Article not found'
    })
})
app.get('*', (req, res)=>{
  res.render('404', {
    name: 'Sarvesh',
    title: '404',
    errorMessage: 'Page Not Found'
  })
})
app.listen(3000, ()=>{
    console.log('Server is working!!!!!')
})

