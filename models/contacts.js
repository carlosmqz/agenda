const mongoose = require('mongoose');
const contact = new mongoose.Schema({
            name: String,
            address: [
                {
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

module.exports = {
    contactSchema : contact
}