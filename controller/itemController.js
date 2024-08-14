const Item = require('../Model/Item');
const ItemPhoto = require('../Model/item_photo');


module.exports = {
    addItem: async (req, res) => {
        const { time, foodtags, category, code, store, imageUrl, description, price, additives, title } = req.body;
        if (!time || !foodtags || !category || !code || !store || !imageUrl || !description || !price || !additives || !title) {
            return res.status(400).json({ status: false, message: "All fields are required" });
        }
        try {
            const newItem = new Item(req.body);
            await newItem.save();
            res.status(201).json({ status: true, message: "Item created successfully" });
        } catch (error) {
            res.status(500).json({ status: true, message: error.message });
        }
    },

    getItembyId: async (req, res) => {
        const Id = req.params.id;
        try {
            const item = await Item.findById(Id);
            res.status(200).json(item);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },
    getitembystore: async (req, res) => {
        const id = req.params.id;
        try {
            const items = await Item.find({ store: id });
            res.status(200).json(items);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },
    getitembycategoryandcode: async (req, res) => {
        const category = req.params.category;
        const code = req.params.code;
        try {
            let items = [];
            if (category && code) {
                items = await Item.aggregate([
                    {
                        $match: {
                            category: category,
                            code: code,
                            isAvailable: true
                        }
                    },
                    { $project: { __v: 0 } }
                ]);
            }
            if (items.length == 0) {
                return res.status(404).json({ status: true, message: "No item found" });
            }
            res.status(200).json(items);
        }
        catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },
    searchitems: async (req, res) => {
        const search = req.params.search;
        try{
            const result = await Item.aggregate([
                { 
                    $match: { 
                        $or: [
                            { title: { $regex: search, $options: 'i' } }, 
                            { foodtags: { $regex: search, $options: 'i' } }
                        ],
                        isAvailable: true
                    } 
                },
                { $project: { __v: 0 } },
            ]);
            res.status(200).json(result);
        }
        catch(error){
            res.status(500).json({status:true, message: error.message });
        }
    },
    getItembycode: async (req, res) => {
        const code = req.params.code;
        try {
            const item = await Item
                .findOne({ code: code });
            res.status(200).json(item);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },
    photoUpload: async (req, res) => {
        const { image, filename } = req.body;
        if (!image || !filename) {
            return res.status(400).json({ status: false, message: "All fields are required" });
        }
        try {
            const newPhoto = new ItemPhoto({ image, filename });
            await newPhoto.save();
            res.status(201).json({ status: true, message: "Photo uploaded successfully" });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },
};