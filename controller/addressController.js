const User = require('../model/User');
const Address = require('../model/Address');

module.exports = {
    addAddress: async (req, res) => {
        const newAddress = new Address({
            userId: req.user.id,
            addressline1: req.body.addressline1,
            postalcode: req.body.postalcode,
            default: req.body.default,
            deliveryinstruction: req.body.deliveryinstruction,
            lat: req.body.lat,
            long: req.body.long,
        });
        try {
            if(req.body.default === true){
                await Address.updateMany({userId: req.user.id}, {default: false});
            }

            await newAddress.save();
            res.status(201).json({message: 'Address added successfully'});
        } catch (error) {
            console.error('Error adding address:', error);
            res.status(500).json(error);
        }
    },
    getAddress: async (req, res) => {   
        try {
            const address = await Address.find({userId: req.user.id});
            res.status(200).json(address);
        } catch (error) {
            console.error('Error getting address:', error);
            res.status(500).json(error);
        }
    },
    deleteAddress: async (req, res) => {
        try {
            await Address.findByIdAndDelete(req.params.id); 
            res.status(200).json({message: 'Address deleted successfully'});
        } catch (error) {
            console.error('Error deleting address:', error);
            res.status(500).json(error);
        }
    },
    setAddressDefault: async (req, res) => {
        const addressId = req.params.id;
        const userId = req.user.id;
        try {
            await Address.updateMany({userId: req.user.id}, {default: false});
            const updateAddress = await Address.findByIdAndUpdate(addressId, {default: true});

            if(updateAddress){
                await User.findByIdAndUpdate(userId, {address: addressId});
                res.status(200).json({message: 'Address set as default successfully'});
            }else{
                res.status(404).json({message: 'Address not found'});
            }
        } catch (error) {
            console.error('Error setting default address:', error);
            res.status(500).json(error);
        }
    },
    getDefaultAddress: async (req, res) => {
        const userId = req.user.id;

        try {
            const address = await Address.findOne({userId: userId, default: true});
            res.status(200).json(address);
        } catch (error) {
            console.error('Error getting default address:', error);
            res.status(500).json(error);
        }
    },
};
