const express = require('express')
const router = express.Router();
const base64 = require('base-64')
const contactsModel = require('../models/contacts')
const mongoose = require('mongoose')
router.get('', (req, res) =>{
    res.send('API server up')
})

router.get('/allContacts', (req, res) => {
    contactsModel.find().then((data) => {
        if(data.length === 0){
            res.status(200).send({
                message:'Query didn\'t\ return any values',
                data: {}
            })
        }
        res.status(200).send({
            error : null,
            message:'Query all contacts successfull',
            data: data
        })
    })
    .catch((err) => {
        console.log(err)
        res.status(400).send({
            error: err,
            message: 'Query all contacts error',
            data: null
        })
    })  
})

router.get('/contacts/:id', (req, res) => {
    const _id = req.params.id
    contactsModel.findById({_id:_id},(err, contactData) =>{
        if(err){
            res.status(400).send({
                error: err,
                message: 'Error ocurred or record doesnt exist',
                data: null
            })
        }
        if(contactData){
            res.status(200).send({
                error : null,
                message:'Contact found',
                data: contactData
            })
        }
    })
})

router.post('/add/:contactData', (req, res) => {
    const dataJsonObject = JSON.parse(base64.decode(req.params.contactData))
    const contactData = new contactsModel(dataJsonObject);
    contactData.save()
        .then(res.status(200).send({
            error : null,
            message:'Contact correctly saved',
            data: dataJsonObject
        }))
        .catch((err) => {
            res.status(400).send({
                error: err,
                message: 'Error ocurred while saving',
                data: null
            })
        });
   
})

router.delete('/delete/:id', (req, res) =>{
    contactsModel.findByIdAndDelete(req.params.id, (err, res) =>{
        if(err){
            res.status(400).send({
                error: err,
                message: 'Error ocurred while deleting contact',
                data: null
            })
        }
    })
    res.status(200).send({
        error : null,
        message:'Contact correctly deleted',
        data: req.params.id
    })
}); //delete

module.exports = router
