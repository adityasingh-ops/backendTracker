const DoctorModel = require("../Model/Doctor");

module.exports = {
    addDoctor: async (req, res) => {
        try {
        const newDoctor = new DoctorModel(req.body);
        await newDoctor.save();
        res.status(201).json({ status: true, message: "Doctor created successfully" });
        } catch (error) {
        res.status(500).json({ status: false, message: error.message });
        }
    },
    getalldoctors: async (req, res) => {
        try {
        const doctors = await DoctorModel.find();
        res.status(200).json(doctors);
        } catch (error) {
        res.status(500).json({ status: false, message: error.message });
        }
    },
    findbyName: async (req, res) => {
        const name = req.params.name;
        try {
        const doctors = await DoctorModel.find({ name: name });
        res.status(200).json(doctors);
        } catch (error) {
        res.status(500).json({ status: false, message: error.message });
        }
    },
    findbyid: async (req, res) => {
        const id = req.params.id;
        try {
        const doctor = await DoctorModel.findById(id);
        res.status(200).json(doctor);
        } catch (error) {
        res.status(500).json({ status: false, message: error.message });
        }
    },
};