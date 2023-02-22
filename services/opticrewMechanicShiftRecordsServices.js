const MechanicDetails = require("../common/MechanicDetails");
const SubAreasDetails = require("../common/SubAreaDetails");
const ShiftBreakTime = require("../common/ShiftBreakTime");
const SHIFT_BREAK_TIMINGS = require("../constants/shift_breaktimings");


const getMechanicShiftRecords = async (req, res) => {
    try {
        if (!req.query.userId) {
            res.status(400).send("UserId not entered!")
        }

        let mechanicLists, subAreas, breakList, shiftDetails, nextShiftTime;

        //to get the time in 24 hr format
        let currentDateTime = new Date();
        let formattedTime = currentDateTime.getHours() + ":" + currentDateTime.getMinutes() + ":" + currentDateTime.getSeconds();
        console.log(formattedTime)

        //to get the day number 
        daynumber = new Date().getDay()

        SHIFT_BREAK_TIMINGS[daynumber].filter(ele => {
            if (formattedTime >= ele.shiftStartTime && formattedTime <= ele.shiftEndTime) {
                shiftDetails = ele;
                return shiftDetails

            }
        });

        mechanicLists = await MechanicDetails.MechanicDetails(req, res);
        subAreas = await SubAreasDetails.subAreas(req, res);
        breakList = await ShiftBreakTime.ShiftBreakTime(req, res);

        let mechanicShiftRecords = {
            "records": {
                "subareas": subAreas,
                "shiftStart": shiftDetails.shiftStartTime,
                "shiftEnd": shiftDetails.shiftEndTime,
                "mechanicList": mechanicLists,
                "breakList": breakList

            }
        }
        if (mechanicShiftRecords) {
            res.send(mechanicShiftRecords);
        }
        else {
            res.send("Shift Records not found")
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