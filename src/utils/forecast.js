const request=require('request');
const forecast=(latitude,longitude,callback)=>{
const url='https://api.darksky.net/forecast/1a68ce56e1528bc3074a72d83e80a79f/'+ latitude+','+longitude +'?units=ca&exclude=minutely,hourly,flags,alerts';
request({url,json:true},(error,response)=>{
    if(error)
    {
        callback('Unable to connect to Weather Services',undefined);
    }else if(response.body.error)
    {
        callback('Unable to find Location',undefined);
    }
    else{
        callback(undefined,{
           summary:response.body.daily.data[0].summary,
           temp:response.body.currently.temperature,
           rain_prob:response.body.currently.precipProbability
        })
    }
})
}
module.exports=forecast;