const mangoose = require('mongoose');

const RatingSchema = mangoose.Schema({
    UserId: {
        type: String,
        required: true
    },
    ratingType: {
        type: String,
        required: true,
        enum: ['store', 'item', 'delivery']
        
    },
    product: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
});

module.exports = mangoose.model('Rating', RatingSchema);