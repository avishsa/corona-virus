"use strict";

const utils = require( "../utils" );

const register = async ( { sql, getConnection } ) => {
   // read in all the .sql files for this folder
   const sqlQueries = await utils.loadSqlQueries("countries");

   const getCountries = async () => {
       // get a connection to SQL Server
       const cnx = await getConnection();
       // create a new request
       const request = await cnx.request();          
       // return the executed query
       return request.query( sqlQueries.getCountries );
   };
 
   const createCountry = async ()=>{
     // get a connection to SQL Server
        const pool = await getConnection();
      // create a new request
      const request = await pool.request(); 
       // return the executed query
       return request.query( sqlQueries.createCountry);
   };
   const addCountry = async({location,iso_code})=>{
    const pool = await getConnection();
    const request = await pool.request();
    request.input( "location", sql.VarChar( 50 ), location );
    request.input( "iso_code", sql.VarChar( 3 ), iso_code );
    return request.query( sqlQueries.addCountry );
   };
   const deleteCountry = async()=>{
    const pool = await getConnection();
    const request = await pool.request();
    return request.query( sqlQueries.deleteCountry);
   }
   return {
    getCountries,
    createCountry,
    addCountry,
    deleteCountry,
    
   };
};

module.exports = { register };