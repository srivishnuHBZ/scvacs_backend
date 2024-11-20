
const db = require('../models')
const asyncHandler = require('../middlewares/async');

let vehicle = db.vehicle;

exports.getVehicles = asyncHandler(async (req, res, next) => {
    try {
        const hl7 = await vehicle.findAll({
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