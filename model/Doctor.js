const mangoose = require('mongoose');

const doctorSchema = new mangoose.Schema(
    {
        image: String,
        name: String,
        title: String,
        price: String,
        availiable: String,
        address:String,
        patients: String,
        experience: String,
        certificate: String,
        description: String,
        tell: Number,
      },
      { Timestamp: true }
);
module.exports = mangoose.model('Doctor', doctorSchema);

