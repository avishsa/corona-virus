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
                    
                    let valid_countries = [];
                    
                    
                    for (const [iso_code, record] of Object.entries(records_data)) { 
                        
                        if (countries_data.filter(c=>c.code===iso_code).length===0)
                            continue;
                        
                        valid_countries.push(iso_code);
                        //await db.countries.insert({isocode:params["countryId"],location:""});
                        /*const location = record["location"];  
                        const record_data = record["data"];
                        const countrycode = await ISOCode.findOne({"code":iso_code});
                         // insert country
                        await db.countries.insert(params["countryId"]);
                        // insert records                    
                        await db.reports.insert(params["countryId"]);   
                        // return the recordset object*/
                    }
                    return {msg:'sucessfull seeding'};
                   
                } catch ( err ) {
                    console.log( err );
                    return {err}
                }
            }
        }
   });
}