const store = require('../Model/Store');

module.exports = {
    addStore: async (req, res) => {
        const{ title,time, imageUrl,owner,code,logoUrl,coords,type} = req.body;
        if(!title || !type || !time || !imageUrl || !owner || !code || !logoUrl || !coords|| !coords.lat || !coords.long||!coords.address||!coords.title){
            return res.status(400).json({status:false, message: "All fields are required"});
        }
        try {
            const newStore = new store(req.body);
            await newStore.save();
            res.status(201).json({status:true, message: "Store created successfully" });
        } catch (error) {
            res.status(500).json({status:true, message: error.message });
        }
    },
    getStorebyId: async (req, res) => {
        const Id = req.params.id;
        try {
            const store = await store.findById(Id);
            res.status(200).json(store);
        } catch (error) {
            res.status(500).json({status:false, message: error.message });
        }
    },
    getNearbyStore: async (req, res) => {
        const type = req.params.type;
        const code = req.params.code;
    
        try {
            let allNearbyStores = [];
    
            if (type && code) {
                allNearbyStores = await store.aggregate([
                    {
                        $match: {
                            type: type,
                            code: code,
                            isAvailable: true
                        }
                    },
                    { $sample: { size: 4 } },
                    { $project: { __v: 0 } }
                ]);
            }
    
            if (allNearbyStores.length === 0) {
                return res.status(404).json({ status: true, message: "No store found" });
            }
    
            res.status(200).json(allNearbyStores);
    
        } catch (error) {
            res.status(500).json({ status: true, message: error.message });
        }
    },
    getallNearbyStore: async (req, res) => {
        const type = req.params.type;
        const code = req.params.code;
    
        try {
            let allNearbyStores = [];
    
            if (type && code) {
                allNearbyStores = await store.aggregate([
                    {
                        $match: {
                            type: type,
                            code: code,
                        }
                    },
                    { $project: { __v: 0 } }
                ]);
            }
    
            if (allNearbyStores.length === 0) {
                return res.status(404).json({ status: true, message: "No store found" });
            }
    
            res.status(200).json(allNearbyStores);
    
        } catch (error) {
            res.status(500).json({ status: true, message: error.message });
        }
    },
    
};