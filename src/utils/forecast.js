const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=4ebcf2feeb09a827f82011f249f969c2&query='+latitude+','+longitude
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect to location services!',undefined)
        }else if(body.error){
            callback('Unable to find location.Try another search',undefined)
        }
        else{
            callback(undefined,body.current.weather_descriptions+". It is currently "+body.current.temperature+" degree out. It feel like "+body.current.feelslike+ " degree out.")
        }
    })
 

}
module.exports=forecast