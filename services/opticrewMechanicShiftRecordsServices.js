const MechanicDetails = require("../common/MechanicDetails");
const SubAreasDetails = require("../common/SubAreaDetails");
const MechanicShiftBreakTime = require("../common/MechanicShiftBreakTime");
const SHIFT_BREAK_TIMINGS = require("../constants/shift_breaktimings");
const MECHANIC_DETAILS = require("../constants/mechanic_details");

const getMechanicShiftRecords = async (req, res) => {
    try {
        if (!req.query.userId) {
            res.status(400).send("UserId not entered!")
        }
        let userId = req.query.userId;
        let mechanicLists, subAreas, breakList, shiftDetails, mechanicShift, mechanicShiftRecords;

        //to get the time in 24 hr format
        let currentDateTime = new Date();
        let formattedTime = currentDateTime.getHours() + ":" + currentDateTime.getMinutes() + ":" + currentDateTime.getSeconds();
        console.log(formattedTime)

        //to get the day number 
        daynumber = new Date().getDay()

        if (MECHANIC_DETAILS[userId]) {
            mechanicShift = MECHANIC_DETAILS[userId].shift


            SHIFT_BREAK_TIMINGS[daynumber].filter(ele => {
                if (formattedTime >= ele.shiftStartTime && formattedTime <= ele.shiftEndTime) {
                    console.log("shift number", mechanicShift, ele.shiftNo)
                    if (ele.shiftNo === mechanicShift) {
                        shiftDetails = ele;
                    }
                    return shiftDetails;
                }
            });
            mechanicLists = await MechanicDetails.MechanicDetails(req, res);
            subAreas = await SubAreasDetails.subAreas(req, res);
            breakList = await MechanicShiftBreakTime.MechanicShiftBreakTime(req, res);

            if (shiftDetails) {
                res.send(mechanicShiftRecords = {
                    "records": {
                        "subareas": subAreas,
                        "shiftStart": shiftDetails.shiftStartTime,
                        "shiftEnd": shiftDetails.shiftEndTime,
                        "mechanicList": mechanicLists,
                        "breakList": breakList

                    }
                })
            }
            else { res.send(`${userId} does not have any shift in current time zone`) }
        }
        else {
            res.send(`Shift Records not found for this ${userId}!Please verify the SNumber`)
        }
    }
    catch (err) {
        console.log("Error - ", err);
        res.status(500).render('error', { error: err })
    }
};

module.exports = {
    getMechanicShiftRecords
};