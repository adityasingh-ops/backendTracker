const mangoose = require('mongoose');

const storeSchema = new mangoose.Schema({ 
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: [ 'allstore', 'medical', 'service'],
        required: true
    },
    time: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    foods: {
        type: Array,
        default: [],
    },
    pickup: {
        type: Boolean,
        default: true
    },
    delivery: {
        type: Boolean,
        default: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    owner:{
        type: String,
        required: true
    },
    code:{
        type: String,
        required: true
    },
    logoUrl:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        min : 0,
        max : 5,
        default: 3,     
    },
    ratingCount:{
        type: Number,
        default: 267,
    },
    verification:{
        type: String,
        default: 'pending',
        enum: ['pending', 'verified', 'rejected']
    },
    verificationmessage:{
        type: String,
        default: 'Your store is under review'
    },
    coords:{
        id: {
            type: String,
            required: true
        },
        lat: {
            type: Number,
            required: true
        },
        long: {
            type: Number,
            required: true
        },
        latdelta: {
            type: Number,
            default: 0.1,
        },
        longdelta: {
            type: Number,
            default: 0.1,
        },
        address: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
    },

});


module.exports = mangoose.model('store', storeSchema);