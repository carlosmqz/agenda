const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
            name: String,
            address: [
                {
                    addressName: String,
                    addressType: String,
                    cp: Number,
                    state: String
                }
            ],
            phone:[
                {
                    phoneType: String,
                    phoneNumber: String
                }
            ]
        })
const contactModel = mongoose.model('Contact',contactSchema, 'agenda')
module.exports = contactModel