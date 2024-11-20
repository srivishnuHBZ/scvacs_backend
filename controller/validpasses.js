
const db = require('../models')
const asyncHandler = require('../middlewares/async');
let valid_passes = db.valid_passes;
let vehicle = db.vehicle;
//create pass
exports.createPass = asyncHandler(async (req, res, next) => {
    // req.body.Pass_Type = "normal";
    // req.body.Pass_Number = new Date().getFullYear()
    try {
        const vehicleData = await vehicle.findAll();
        
    let obj = req.body;
    obj.Pass_Type = "normal";
    obj.Pass_Year = new Date().getFullYear();
    
        const valid_pass = await valid_passes.create(obj);
        console.log(valid_pass?.null)//valid pass number
        // console.log(valid.pass?.dataValues?.License_Plate_Number)
        let tempVehicleData = vehicleData.find(x => x.License_Plate_Number === valid_pass.License_Plate_Number)
        if (tempVehicleData) {
            tempVehicleData.Valid_Pass = valid_pass?.null;
            const tempObj = {
                Valid_Pass: tempVehicleData.Valid_Pass
            }
            console.log(tempVehicleData.id, tempVehicleData.Valid_Pass)
            const update = await vehicle.update(tempObj, {
                where: {
                    id: tempVehicleData.id
                }
            });
            console.log("updated vehicle table")
        }
        res.status(201).json({ success: true, msg: "Data created successfully" });
    }
    catch (error) {
        console.log(error);
    }
})
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