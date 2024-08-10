const mangoose = require('mongoose');

const AddressSchema = new mangoose.Schema({
   userId: {
       type: String,
       required: true
   },
    addressline1: {
         type: String,
         required: true
    },
    postalcode: {
        type: String,
        required: true
    },
    default: {
        type: Boolean,
        default: false
    },
    deliveryinstruction: {
        type: String,
        required: false
    },
    lat: {
        type: String,
        required: false
    },
    long: {
        type: String,
        required: false
    }

});

module.exports = mangoose.model('Address', AddressSchema);