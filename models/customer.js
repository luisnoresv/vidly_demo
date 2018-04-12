const mongoose = require('mongoose');
//JOI is for validate the input data
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    }
});

const Customer = mongoose.model('Customer', customerSchema)


function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).required(50),
        phone: Joi.string().min(5).required(20),
        isGold: Joi.boolean()
    };

    return Joi.validate(customer, schema);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;