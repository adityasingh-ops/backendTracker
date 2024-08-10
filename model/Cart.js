const mangoose = require('mongoose');

const CartSchema = new mangoose.Schema({
    userId: {
        type: mangoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId:{
        type: mangoose.Schema.Types.ObjectId,
        ref: 'item',
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    totalprice:{
        type: Number,
        required: true
    }
},{timestamps: true});

module.exports = mangoose.model('Cart', CartSchema);