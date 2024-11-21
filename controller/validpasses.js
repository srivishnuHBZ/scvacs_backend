
const db = require('../models')
const asyncHandler = require('../middlewares/async');
let valid_passes = db.valid_passes;
let vehicle = db.vehicle;
//create pass
exports.createPass = asyncHandler(async (req, res, next) => {
    try {
        // Get vehicle data from the database
        const vehicleData = await vehicle.findAll();

        // Create the pass object without the identity column
        let obj = req.body;
        obj.Pass_Type = "normal";
        obj.Pass_Year = new Date().getFullYear();

        // Create a new valid pass
        const valid_pass = await valid_passes.create(obj);

        // Find the vehicle corresponding to the valid pass
        let tempVehicleData = vehicleData.find(x => x.License_Plate_Number === valid_pass.License_Plate_Number);
        
        if (tempVehicleData) {
            tempVehicleData.Valid_Pass = valid_pass.Pass_Number; // Assuming Pass_Number is auto-generated
            
            // Prepare the update object for the vehicle
            const tempObj = {
                Valid_Pass: tempVehicleData.Valid_Pass
            };

            // Update the vehicle table with the new valid pass number
            const update = await vehicle.update(tempObj, {
                where: {
                    id: tempVehicleData.id
                }
            });

            console.log("Updated vehicle table");
        }

        res.status(201).json({ success: true, msg: "Data created successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "An error occurred" });
    }
});
//get all passes
exports.getAllPasses = asyncHandler(async (req, res, next) => {
    try {
        const hl7 = await valid_passes.findAll();
        res.status(200).json({ success: true, data: hl7 });
    }
    catch (error) {
        console.log(error);
    }
});
//get one pass
exports.getPass = asyncHandler(async (req, res, next) => {
    try {
        const hl7 = await valid_passes.findByPk(req.params.id);
        res.status(200).json({ success: true, data: hl7 });
    }
    catch (error) {
        console.log(error);
    }
});
//update pass
exports.updatePass = asyncHandler(async (req, res, next) => {
    try {
        const hl7 = await valid_passes.update(req.body, {
            where: {
                Pass_Number: req.params.id
            }
        });
        res.status(200).json({ success: true, msg: 'data updated' })
    }
    catch (error) {
        console.log(error);
    }
})
//delete Pass
exports.deletePass = asyncHandler(async (req, res, next) => {
    try {
        const vehicleData = await vehicle.findAll();
        
        const hl7 = await valid_passes.destroy({
            where: {
                Pass_Number: req.params.id
            }
        })
        let tempVehicleData = vehicleData.find(x => x.Valid_Pass === req.params.id)
        if (tempVehicleData) {
            // tempVehicleData.Valid_Pass = null;
            const tempObj = {
                Valid_Pass: null
            }
            console.log(tempVehicleData.id, tempVehicleData.Valid_Pass)
            const update = await vehicle.update(tempObj, {
                where: {
                    id: tempVehicleData.id
                }
            });
            console.log("updated vehicle table")
        }
        res.status(200).json({ success: true, msg: 'Pass deleted' })
    }
    catch (error) {
        console.log(error);
        }
})