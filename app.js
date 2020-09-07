require('dotenv').config()
const cors = require('cors')
const express = require('express');
const mongoDBConnection = require('./database/mongoDB')
const AgendaRouter = require('./routers/agenda');
const app = express();
const port = process.env.port;

//middleware
app.use(cors())
app.use(express.json())
app.use('/', express.static(__dirname + '/public'));
//routes
app.use('/agenda', AgendaRouter);
module.exports = app;


app.listen(port,() =>{
   console.log('Web server running at port ', port)
})