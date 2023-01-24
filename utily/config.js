"use strict";

const assert = require( "assert" );
const dotenv = require( "dotenv" );

// read in the .env file
dotenv.config();

// capture the environment variables the application needs
const { PORT,
   HOST,
   HOST_URL,

   MONGO_DB,
   SQL_SERVER,
   SQL_DATABASE,
   SQL_USER,
   SQL_PASSWORD,
   
} = process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT === "true";

// validate the required configuration information
assert( PORT, "PORT configuration is required." );
assert( HOST, "HOST configuration is required." );
assert( HOST_URL, "HOST_URL configuration is required." );

assert( MONGO_DB, "MONGO_DB configuration is required." );
assert( SQL_SERVER, "SQL_SERVER configuration is required." );
assert( SQL_DATABASE, "SQL_DATABASE configuration is required." );
assert( SQL_USER, "SQL_USER configuration is required." );
assert( SQL_PASSWORD, "SQL_PASSWORD configuration is required." );

// export the configuration information
module.exports = {
   port: PORT,
   host: HOST,
   url: HOST_URL,
   
   sql: {
       server: SQL_SERVER,
       database: SQL_DATABASE,
       user: SQL_USER,
       password: SQL_PASSWORD,
       options: {
           encrypt: sqlEncrypt
       }
   },
   mongo:{
        server:MONGO_DB
   },
   
};