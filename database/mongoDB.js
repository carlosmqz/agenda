require('dotenv').config()
const mongoose = require('mongoose')

const dbURI = process.env.databaseuri
mongoose.connection.on('error', console.error.bind('Error creating database connection'))
    .once('open',function(){
        console.log('Database connection complete')
    })
module.exports =  mongoose.connect(dbURI, {useNewUrlParser : true,  useUnifiedTopology: true});

