const path=require('path');
const express = require('express');
const hbs=require('hbs');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');

const app=express();
const port=process.env.PORT || 3000;

//console.log(__filename);
//Define paths for Express configuration
const publicDirectoryPath=path.join(__dirname,'../public');
const viewspath=path.join(__dirname,'../templates/views');
const partialpath=path.join(__dirname,'../templates/partials');

//setup handlebars engine and views location
 app.set('view engine','hbs');
 app.set('views',viewspath);
 hbs.registerPartials(partialpath);

//setup static directory to serve up.
app.use(express.static(publicDirectoryPath));

/*app.get('',(req,res)=>{
    res.send('Hello Express!');
    

})  // this is of no use now as above app.use is going to find a match and since index.html is unique
//  it will use it as root by default
app.get('/help',(req,res)=>{
   res.send('Help Page');
   
})
app.get('/about',(req,res)=>{
    //res.send('About Page');
    res.send('<h1>About</h1>');
 })*/
 app.get('',function(req,res){
     res.render('index',{
         title:'Weather',
         name:'Badri Vishal Soni'
     });
 });
  app.get('/about',(req,res)=>{
      res.render('about',{
          title:'About me',
          name:'Badri Vishal Soni'
      })
  });
 app.get('/help',(req,res)=>{
     res.render('help',
     {
       msg:'this is the help page please state your queries.',
       title:'Help Page',
       name:'Badri Vishal Soni'
     })
 });
 app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'No address provided'
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error)
        {
            return res.send({
                error:error
            });
        }
        
            forecast(data.latitude,data.longitude,(error,fordata)=>{
                if(error)
             return res.send({
                    error:error
                })
                res.send({
                    forecast:{
                        temperature:fordata.temp,
                        summary:fordata.summary
                    },
                    location : data.place,
                    address:req.query.address
                });
            })
        
    })
   /* res.send({
        forecast:'50 degree',
     location:'Dubai',
     address:req.query.address
    });*/
     
     //res.send('weather Page');
 })
 /*
 app.get('/product',(req,res)=>{

    if(!req.query.search)
    {
        return res.send({
            error: 'you must search for something'
        })
    }
    console.log(req.query);
    res.send({
        products:[]
    })

 });
 */

 app.get('/help/*',(req,res)=>{
       res.render('error 404',{
           title:'Help',
        msg:'Help article not found',
        name:'xyz'
       });
    
 });
 


 app.get('*',(req,res)=>{
     res.render('error 404',{
         title:'Error 404',
         msg:'Page not found',
         name:'xyz'
     });
 });

 app.listen(port,()=>{
     console.log('server is up at port '+ port);
 })
/* End */
