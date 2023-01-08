
const express = require('express');
const app= express();
const Manager = require("./utily/dbManager");
const fileName= './db/owid-covid-data.json';



app.get('/',(req,res)=>{        
      res.status(200).json({data:'hello world'});
});
app.get('/seed', async(req,res)=>{      
    try{
       await Manager.parse(fileName)
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:err});
        return;
    }
   
    console.log("done");
    res.status(200).json({message:'seeding completed'});           

});
app.get('/countries',async(req,res)=>{
    res.status(200).json(await Manager.countries());
})
app.get('/lastdays/:countryId',async(req,res)=>{
   console.log(req.params["countryId"])
   res.status(200).json(await Manager.lastdays(req.params["countryId"]));
})
module.exports=app;


