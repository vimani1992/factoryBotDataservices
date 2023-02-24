const MechanicDetails = require("../common/MechanicDetails");
const SubAreasDetails = require("../common/SubAreaDetails");
const MechanicShiftBreakTime = require("../common/MechanicShiftBreakTime");
const SHIFT_BREAK_TIMINGS = require("../constants/shift_breaktimings");
const MECHANIC_DETAILS = require("../constants/mechanic_details");
const shiftTimings = require("../common/shiftTiming");

const getMechanicShiftRecords = async (req, res) => {
    try {
        if (!req.query.userId) {
            res.status(400).send("UserId not entered!")
        }
        let userId = req.query.userId;
        
        if(!MECHANIC_DETAILS[userId]){
            res.status(400).send("UserId is not valid");
        }

        let mechanicLists, subAreas, breakList, shiftDetails, mechanicShift, mechanicShiftRecords, shiftTimingDetails;

        shiftTimingDetails = await shiftTimings.shiftTimings(req, res);
        subAreas = await SubAreasDetails.subAreas(req, res);
        mechanicLists = await MechanicDetails.MechanicDetails(req, res);
        breakList = await MechanicShiftBreakTime.MechanicShiftBreakTime(req, res);
        
        res.send(
            mechanicShiftRecords = {
                "records": {
                    "subareas": subAreas,
                    "nextShiftStartTime": shiftTimingDetails.nextShiftStartTime,
                    "shiftStart": shiftTimingDetails.shiftStart,
                    "shiftEnd": shiftTimingDetails.shiftEnd,
                    "mechanicList": mechanicLists,
                    "breakList": breakList
                }
            });
        }
    catch (err) {
        console.log("Error - ", err);
        res.status(500).render('error', { error: err })
    }
};

module.exports = {
    getMechanicShiftRecords
};