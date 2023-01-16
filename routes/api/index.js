"use strict";

const countries = require( "./countries" );
const reports = require( "./reports" );
const fs = require('fs');
const JSONStream = require('JSONStream');
module.exports.register = async server => {
   await countries.register( server );
   await reports.register(server);
   server.route({
        method: "GET",
        path: "/api/seed",
        config: {
            handler: async request => {
                try {
                    // get the sql client registered as a plugin
                    
                    const db = request.server.plugins.sql.client;                
                    
                    //delete records
                    const delete_res = await db.reports.deleteReport();
                    if(delete_res['err']) return delete_res;
                    //delete country
                    await db.countries.deleteCountry();
                    const countriesfile_name ="./db/countries.json";
                    
                    const recordsfile_name="./db/owid-covid-data.json";
                    //seeding
                    //const raw_data_reports=JSON.parse(fs.readFileSync(recordsfile));
                    const countries_file=fs.readFileSync(countriesfile_name);
                    const countries_data= JSON.parse(countries_file);
                    const records_file = fs.readFileSync(recordsfile_name);
                    const records_data= JSON.parse(records_file);
                    
                    let reports_records =[];
                    
                    
                    for (const [iso_code, record] of Object.entries(records_data)) { 
                        
                        if (countries_data.filter(c=>c.code===iso_code).length===0)
                            continue;                       
                        await db.countries.addCountry({iso_code:iso_code,location:record["location"]});
                        
                    const record_data = record["data"];
                    
                    for (let i=0;i<record_data.length ;i++) {                         
                        reports_records.push(
                            {
                                reportDate:record_data[i]["date"],
                                new_cases:record_data[i]["new_cases"]?? null,
                                total_cases:record_data[i]["total_cases"]?? null,
                                total_deaths:record_data[i]["total_deaths"]?? null,
                                ISOCODE:iso_code
                            }
                        );                                                    

                    }             
                    
                       
                    }
                    
                    
                     db.reports.addReports(reports_records);
                    return {msg:'sucessfull seeding wait a few minutes'};//), data:a};
                   
                } catch ( err ) {
                    console.log( err );
                    return {err}
                }
            }
        }
   });
}