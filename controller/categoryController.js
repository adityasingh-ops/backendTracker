const Category = require("../Model/Category")

module.exports = {
    createCategory: async (req, res) => {
        const newCategory = new Category(req.body);
        try {
           await newCategory.save();
            res.status(201).json({status:true, message: "Category created successfully" });
        } catch (error) {
            res.status(500).json({status:true, message: error.message });
        }
    },
    getallCategory: async (req, res) => {
        try {
            const category = await Category.find({title: {$ne: 'More'}}, {__v: 0});
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({status:true, message: error.message });
        }
    },
    getRandomCategory: async (req, res) => {
        try {
            const category = await Category.aggregate([
                {$match: {title: {$ne: 'More'}}},
                { $sample: { size: 4 } }]);
            
               const moreCategory = await Category.findOne({title: 'More'});
                if(moreCategory){
                    category.push(moreCategory);
                }
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({status:true, message: error.message });
        }
    },
 };