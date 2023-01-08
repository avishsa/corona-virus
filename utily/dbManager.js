const fs = require('fs');
const Country = require('../models/Country');
const Report = require('../models/Report');

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
  countryList = await Country.find({});
  countryList= countryList.map(c=>c.location);  
  return countryList;
}
const Manager={
    parser:parser,
    countries:countries
};
module.exports=Manager;