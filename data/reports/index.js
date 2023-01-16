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

    const _request = new sql.Request();
		
		
   /* console.log(reports.length)
    reports.forEach(r=> addReport(r));
    return 'sucess';*/
    const table = new sql.Table('reports');
   
    
    table.create = false;
    //table.columns.add( "ID", sql.Int, {nullable: false} );
    table.columns.add( "ISOCODE", sql.VarChar(3),{nullable: false} );
    table.columns.add( "reportDate", sql.Date,{nullable: false}); 
    table.columns.add( "total_cases", sql.Int ,{nullable: true});   
    table.columns.add( "new_cases", sql.Int ,{nullable: true});   
    table.columns.add( "total_deaths", sql.Int ,{nullable: true});
    reports.forEach(r=> {        
        table.rows.add.apply(table.rows,r);
    });    
    const pool = await getConnection(); 
    const request = pool.request();    
    const results = await request.bulk(table);
    console.log(`rows affected ${results.rowsAffected}`);
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
