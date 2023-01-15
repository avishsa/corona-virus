"use strict";

const utils = require( "../utils" );
const register = async ( { sql, getConnection } ) => {
    
   const getlastdays = async (countryId)=>{
    const today = new Date();
    let earliest= new Date();
    earliest.setDate(today.getDate() -15);
     // get a connection to SQL Server
   const cnx = await getConnection();
   // create a new request
   const request = await cnx.request(); 
   request.input( "countryId", sql.VarChar( 3 ), countryId );  
   request.input( "today", sql.Date, today );  
   request.input( "earliest", sql.Date, earliest );  
   // return the executed query
   return request.query( sqlQueries.getlastdays );
};
const getTop10 = async ({ sql, getConnection })=>{
    // get a connection to SQL Server
   const cnx = await getConnection();
   // create a new request
   const request = await cnx.request(); 
    return request.query( sqlQueries.getTop10 );
};
const deleteReport = async()=>{
    try{
    const pool = await getConnection();
    console.log(pool);
    const request = await pool.request();      
    return request.query( sqlQueries.deleteReport );
    }
    catch(err){
        console.log(err);
        return {...err,"err":true};
    }
};
return {
    getlastdays,
    getTop10,
    deleteReport
};
}
module.exports = { register };
