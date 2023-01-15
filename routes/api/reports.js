module.exports.register = async server => {
    server.route( {
        method: "GET",
        path: "/api/lastdays",
        config: {
            handler: async request => {
                try {
                    // get the sql client registered as a plugin
                    const db = request.server.plugins.sql.client;                
                    var params = request.query
                    
                    
                    // insert records to country
                    
                    const res= await db.reports.getlastdays(params["countryId"]);
    
    
                    // return the recordset object
                    return res.recordset;
                } catch ( err ) {
                    console.log( err );
                }
            }
        }
    } );
    server.route( {
        method: "GET",
        path: "/api/top10",
        config: {
            handler: async request => {
                try {
                    // get the sql client registered as a plugin
                    const db = request.server.plugins.sql.client;                              
                   
                    const res= await db.reports.getTop10();
    
    
                    // return the recordset object
                    return res.recordset;
                } catch ( err ) {
                    console.log( err );
                }
            }
        }
    } );

}