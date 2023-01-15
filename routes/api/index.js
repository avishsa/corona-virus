"use strict";

const countries = require( "./countries" );
const reports = require( "./reports" );
const fs = require('fs');
module.exports.register = async server => {
   await countries.register( server );
   await reports.register(server);
   server.route({
        method: "POST",
        path: "/api/seed",
        config: {
            handler: async request => {
                try {
                    // get the sql client registered as a plugin
                    const db = request.server.plugins.sql.client;                
                    var params = request.query
                    //delete records
                    await db.reports.deleteReport();
                    //delete country
                    await db.countries.deleteCountry();
                    const recordsfile="";
                    const countriesfile="";
                    //seeding
                    const raw_data_reports=JSON.parse(fs.readFileSync(recordsfile));
                    const raw_data_countries = JSON.parse(fs.readFileSync(countriesfile));
                    for (const [iso_code, record] of Object.entries(raw_data_reports)) { 
                        const location = record["location"];  
                        const record_data = record["data"];
                        const countrycode = await ISOCode.findOne({"code":iso_code});
                         // insert country
                        await db.reports.insert(params["countryId"]);
                        // insert records                    
                        await db.reports.insert(params["countryId"]);   
                        // return the recordset object
                    }
                   
                } catch ( err ) {
                    console.log( err );
                }
            }
        }
   });
}