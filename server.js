const http = require('http');
const app= require("./app");
const mongoose=require('mongoose');
const secretdb= "mongodb+srv://avishag:pbpUp57g3NW8aY0w@avishag1.6tqr7.mongodb.net/corona_virus?retryWrites=true&w=majority";
const port = 5000;
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




