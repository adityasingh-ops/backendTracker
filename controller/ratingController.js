const Rating = require('../Model/Rating');
const Item = require('../Model/Item');
const Store = require('../Model/Store');

module.exports = {
    addRating: async (req, res) => {
        const newRating = new Rating({
            UserId: req.body.UserId,
            ratingType: req.body.ratingType,
            product: req.body.product,
            rating: req.body.rating,
        });
        try {
            await newRating.save();
            if(req.body.ratingType === 'Store'){
                const store = await Store.aggregate([
                    { $match: { ratingType:req.body.ratingType,product: req.body.product } },
                    { $group: { _id: '$product', avg: { $avg: "$rating" } } }
                ]);
                if(store.length > 0){
                    await Store.findOneAndUpdate({product: req.body.product}, {rating: store[0].avg});
                }
            }else if(req.body.ratingType === 'Item'){
                const item = await Item.aggregate([
                    { $match: { ratingType:req.body.ratingType,product: req.body.product } },
                    { $group: { _id: '$product', avg: { $avg: "$rating" } } }
                ]);
                if(item.length > 0){
                    await Item.findOneAndUpdate({product: req.body.product}, {rating: item[0].avg});
                }
            }
            res.status(200).json('Rating added successfully');
        } catch (err) {
            res.status(500).json(err);
        }
    },
    checkUserRating: async (req, res) => {
        const ratingType = req.body.ratingType;
        const product = req.body.product;
        try {
            const existingRating = await Rating.findOne({
                UserId: req.body.UserId,
                ratingType: ratingType,
                product: product,
            });
            if (existingRating) {
                res.status(200).json({status:true,message: 'User already rated this product'});
            }else{
                res.status(200).json({status:false,message: 'User not rated this product yet'});
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
