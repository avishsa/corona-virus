const http = require('http');
const app= require("./app");
const mongoose=require('mongoose');
const {MONGO_DB,PORT} = require( "./config" );



const secretdb= MONGO_DB;
const port = PORT;
const server = http.createServer(app);
const options = {
    useNewUrlParser: true,    
    autoIndex: true, //this is the code I added that solved it all       
    useUnifiedTopology: true
  }
  
mongoose.connect(secretdb,options)
.then((result)=>{
    console.log('connected to db');
    server.listen(port);
})
.catch((error)=>{
    console.log('not connected to db',error);
})
;




