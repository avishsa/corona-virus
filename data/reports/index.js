"use strict";

const utils = require( "../utils" );
const register = async ( { sql, getConnection } ) => {
    const sqlQueries = await utils.loadSqlQueries("reports");
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
const getTop10 = async ()=>{
    // get a connection to SQL Server
   const cnx = await getConnection();
   // create a new request
   const request = await cnx.request(); 
    return request.query( sqlQueries.getTop10 );
};
const deleteReport = async()=>{
    try{
    const pool = await getConnection();    
    const request = await pool.request();      
    return request.query( sqlQueries.deleteReport );
    }
    catch(err){
        console.log(err);
        return {...err,"err":true};
    }
};
const addReport = async({ISOCODE,reportDate,total_cases,new_cases,total_deaths})=>{
    
    const pool = await getConnection();
    const request = await pool.request();
    request.input( "ISOCODE", sql.VarChar( 3 ), ISOCODE );
    request.input( "reportDate", sql.Date, reportDate ); 
    request.input( "total_cases", sql.Int, total_cases??0 );   
    request.input( "new_cases", sql.Int, new_cases ?? 0 );   
    request.input( "total_deaths", sql.Int, total_deaths );
    return request.query( sqlQueries.addReport);
  
   };
   const addReports= async(reports)=>{ 
    console.log(reports.length)
    reports.forEach(r=> addReport(r));
    return 'sucess';
   };
return {
    getlastdays,
    getTop10,
    deleteReport,
    addReport,
    addReports
};
}
module.exports = { register };
