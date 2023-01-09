const fs = require('fs');
const Country = require('../models/Country');
const Report = require('../models/Report');
const mongoose = require('mongoose');
const ISOCode = require('../models/ISOCodes');

const isocode = async ()=>{
    await ISOCode.deleteMany();
    const raw_data=fs.readFileSync("./db/countries.json");
    const db = JSON.parse(raw_data); 
    for (const record of db) {  
        const {code, name,eu} = record;
        await ISOCode.create({
            code:code,
            name:name,
            eu:eu
        });
    }
    return {"message":"success"};
}
const parser = async (filename)=>{
    await Report.deleteMany();
    await Country.deleteMany();
    const reports = await Report.find({});
    console.log("reports",reports);
    const countries = await Country.find({});
    console.log("countries",countries);
    const raw_data=fs.readFileSync(filename);
    console.log("parse");
    const db = JSON.parse(raw_data);    
    for (const [iso_code, record] of Object.entries(db)) {        
        const location = record["location"];  
        const record_data = record["data"];
        const countrycode = await ISOCode.find({"code":iso_code});
        if(!countrycode) continue;
        const country = await Country.create({
            location:location
        });      
        let reports = [];
        for (let i=0;i<record_data.length;i++) { 
            reports.push(new Report({
                date:new Date(record["data"][i]["date"]),
                new_cases:record["data"][i]["new_cases"]?? null,
                total_cases:record["data"][i]["total_cases"]?? null,
                total_deaths:record["data"][i]["total_deaths"]?? null,
                country:country
            }))                                   
        }              
        Report.insertMany(reports,(err)=>{
            if(err) console.log(iso_code,err);
        })
        
    }
};
const countries =async ()=>{
    return (await Country.find({}))
  .map(c=>{return {"location":c.location,"id":c._id}});  
   
}
const lastdays = async(countryId)=>{
    const today = new Date();
    let earliest= new Date();
    earliest.setDate(today.getDate() -15);
    
    const query = {
        'country': new mongoose.Types.ObjectId(countryId),
    'date' :{
        $gte: earliest, 
        $lt:  today
    }
};
    return (await Report.find(query)).map(r=>r.new_cases);   
   
}
const top10 =async()=>{
    const today = new Date();
    let earliest= new Date();
    earliest.setDate(today.getDate() -1);
    console.log(today,earliest);
    const query = { 'date' :{
        $gte: earliest, 
        $lt:  today
    }
};
    const report_dates =  (await 
        Report.aggregate([{
            $group:{
                _id:{country:"$country",total_cases:"$total_cases"},
                max: { $max : "$date" },                
            }
            
        },
        { $lookup: {
            from: "countries",
            localField: "_id.country",
            foreignField: "_id",
            as: "country"
         }} 
        ])           
            .sort({
                'max':-1,"_id.total_cases":-1
            })
            .limit(10)
            
            )
        ;  
    const top10 = report_dates;
    return top10.map(t=>{
        //console.log(t.country[0].location);
        return {"date":t.max,
        "total_cases":t._id.total_cases,
        "country":t.country[0].location,        
    };
    });
    

};
const Manager={
    parser:parser,
    isocode:isocode,
    countries:countries,
    lastdays:lastdays,
    top10:top10
};
module.exports=Manager;
