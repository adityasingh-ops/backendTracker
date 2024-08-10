const mangoose = require('mongoose');

const categorySchema = new mangoose.Schema({ 
    title: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
});
module.exports = mangoose.model('Category', categorySchema);