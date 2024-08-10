const mangoose = require('mongoose');

const OrderItemSchema = new mangoose.Schema({
    itemId: {
        type: mangoose.Schema.Types.ObjectId,
        ref: 'Product',
        
    },
    quantity:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    additives:{
        type: Array,
        default: [],
    },
    instruction:{
        type: String,
        default: 'NO Instruction'
    },
    deliveryTime:{
        type:String,
        default: "5:00 to 9:00"
    }
});

const OrderSchema = new mangoose.Schema({
    userId: {
        type: mangoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItem:[OrderItemSchema],
    ordertotal:{
        type: Number,
        required: true
    },
    deliverycharge:{
        type: Number,
        required: true
    },
    grandtotal:{
        type: Number,
        required: true
    },
    deliveryAddress:{
        type: mangoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    storeAddress:{
        type: mangoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    paymentMethod:{
        type: String,
        required: true
    },
    paymentStatus:{
        type: String,
        default: 'pending',
        enum: ['pending', 'paid', 'failed']
    },
    orderStatus:{
        type: String,
        default: 'pending',
        enum: ['pending', 'confirmed', 'delivered', 'cancelled', 'failed', 'processing', 'packed', 'shipped']

    },
    storeId:{
        type: mangoose.Schema.Types.ObjectId,
        ref: 'Store',
    },
    storecoords:[Number],
    recipientcoords:[Number],
    driverId:{
        type: String,
        default: ''

    },
    rating:{
        type: Number,
        min : 0,
        max : 5,
        default: 3,     
    },
    feedback:{
        type: String,
        default: ''
    },
    promoCode:{
        type: String,
        default: ''
    },
    discount:{
        type: Number,
        default: 0
    },

},{timestamps: true});

module.exports = mangoose.model('Order', OrderSchema);