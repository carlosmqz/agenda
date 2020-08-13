require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express');
const base64 = require('base-64')
const contactsSchema = require('./models/contacts').contactSchema
const app = express();
const port = process.env.port;
const dbURI = process.env.databaseuri
//middleware
app.use(cors())

connect();

module.exports = app;
//routes
app.get('', (req, res) =>{
    res.send('API server up')
})

app.get('/allContacts', (req, res) => {
    const Contact = mongoose.model('Contact',contactsSchema, 'agenda')
    Contact.find().then((data) => {
        res.send({
            error : null,
            message:'Query all contacts successfull',
            data: data
        })
    })
    .catch((err) => {
        console.log(err)
        res.send({
            error: err,
            message: 'Query all contacts error',
            data: null
        })
    })  
})

app.get('/contacts/:id', (req, res) => {
    const Contact = mongoose.model('Contact',contactsSchema, 'agenda')
    const _id = req.params.id
    Contact.findById({_id:_id},(err, contactData) =>{
        if(err){
            res.send({
                error: err,
                message: 'Error ocurred or record doesnt exist',
                data: null
            })
        }
        if(contactData){
            res.send({
                error : null,
                message:'Contact found',
                data: contactData
            })
        }
    })
})

app.post('/add/:contactData', (req, res) => {
    
    const Contact = mongoose.model('Contact', contactsSchema,'agenda')
    const dataJsonObject = JSON.parse(base64.decode(req.params.contactData))
    const contactData = new Contact(dataJsonObject);
    contactData.save()
        .then(res.send({
            error : null,
            message:'Contact correctly saved',
            data: dataJsonObject
        }))
        .catch((err) => {
            res.send({
                error: err,
                message: 'Error ocurred while saving',
                data: null
            })
        });
   
})

app.delete('/delete/:id', (req, res) =>{
    const Contact = mongoose.model('Contact', contactsSchema, 'agenda');
    Contact.findById(req.params.id,(err, contactData) => {
        if(err){
            throw err;
        }
        if(contactData){
            Contact.remove({_id: contactData._id},(err)=>{
                console.log('Error deleting contact...')
                res.send({
                    error: err,
                    message: 'Error ocurred while deleting contact',
                    data: null
                })
            });
            res.send({
                error : null,
                message:'Contact correctly deleted',
                data: contactData
            })
        }    
    })// findById
}); //delete


function connect(){
    mongoose.connection.on('error', console.error.bind('Error creating database connection'))
    .on('disconnected', connect)
    .once('open',function(){
        console.log('Database connection complete')
    })
    return mongoose.connect(dbURI, {useNewUrlParser : true});
}
app.listen(port,() =>{
   console.log('Web server running at port ', port)
})