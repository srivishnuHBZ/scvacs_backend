
const db = require('../models')
const asyncHandler = require('../middlewares/async');

let vehicle_history = db.vehicle_history;

exports.getHistory = asyncHandler(async (req, res, next) => {
    try {
        const hl7 = await vehicle_history.findAll({
            include: [{
                model: db.valid_passes,
            }]
        });
        res.status(200).json({ success: true, data: hl7 });
    }
    catch (error) {
        console.log(error);
    }
});

exports.createHistory = asyncHandler(async (req, res, next) => {
    try {
        const hl7 = await valid_passes.create(req.body);
        res.status(201).json({ success: true, msg: "Data created successfully" });
    }
    catch (error) {
        console.log(error);
    }
})