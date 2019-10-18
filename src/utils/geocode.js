const request=require('request');
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiYmFkcmktc29uaSIsImEiOiJjazA5NzBnMDgwNHdqM2NtbnM5ejduOXhnIn0.RukevhZYbRZb0snw_PZH2w&limit=1';
    request({url,json:true},(error,response)=>{
        if(error)
        {
            callback('Unable to connect to Location Service',undefined);
        } else if(response.body.features.length===0) {
            callback('Unable To Locate,Try Another Search',undefined);
        } else{
            callback(undefined,{
                longitude : response.body.features[0].center[0],
                latitude : response.body.features[0].center[1],
                place : response.body.features[0].place_name
            })
        }
    })
}
module.exports=geocode;