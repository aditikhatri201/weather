const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode = require('./utils/gecode.js')
const forecast=require('./utils/forecast.js')
const app=express()
const port = process.env.PORT || 3000

const publicdirectory=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../temp/views')
const partialpath=path.join(__dirname,'../temp/partials')
const footerpath=path.join(__dirname,'../temp/footer')

app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)
hbs.registerPartials(footerpath)

app.use(express.static(publicdirectory))

app.get('',(req,res)=>{
    res.render('index',{
        tittle:'Weather',
        name:'Aditi khatri'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        tittle:'About',
        name:'Aditi khatri'
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'This is some helpful text',
        tittle:'Help',
        name:'Aditi khatri'
    })
})


app.get('/weather',(rep,res)=>{
    if(!rep.query.address){
        return res.send({
            error:'You must provide address'
        })
    }
    geocode(rep.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
           return res.send({
               error:error
           })
        }
    forecast(latitude,longitude,(error,forecastdata)=>{
        if(error){
            return res.send({
                error:error
            })
        }
    res.send({
        forecast:forecastdata,
        location:location,
        address:rep.query.address
    })
    })

    })
})

app.get('/product',(rep,res)=>{
    if(!rep.query.search){
        return res.send({
            error:'You must provide search term'
        })
    }
    console.log(rep.query.search)
    res.send({
        product: []
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        tittle:'404',
        name:'Aditi khatri',
        errormessage:'Help page not found.'
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        tittle:'404',
        name:'Aditi khatri',
        errormessage:'404 page not found.'
    })

})


app.listen(port,()=>{
    console.log('server is up on port '+port)
})