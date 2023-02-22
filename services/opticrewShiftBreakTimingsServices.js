const SHIFT_BREAK_TIMINGS = require("../constants/shift_breaktimings");
const MECHANIC_DETAILS = require("../constants/mechanic_details");

const getShiftBreakTimings = async (req, res) => {
    try {

        let breakList = [];

        //to get the time in 24 hr format
        let currentDateTime = new Date();
        let formattedTime = currentDateTime.getHours() + ":" + currentDateTime.getMinutes() + ":" + currentDateTime.getSeconds();
        console.log(formattedTime)

        //to get the day number 
        daynumber = new Date().getDay()

        SHIFT_BREAK_TIMINGS[daynumber].filter(ele => {
            if (formattedTime >= ele.shiftStartTime && formattedTime <= ele.shiftEndTime) {
                breakList.push({
                    "breakName": ele.breakName,
                    "breakDescription": ele.breakDescription,
                    "breakStartTime": ele.breakStartTime,
                    "breakEndTime": ele.breakEndTime
                });
                return breakList;
            }
        })
        if (breakList.length > 0) {
            res.send({ "breakList": breakList });
        }
        else {
            res.status(400).send("break is not available for current shift.");

        }
    }
    catch (err) {
        console.log("Error - ", err);
        res.status(500).render('error', { error: err })
    }
};

module.exports = {
    getShiftBreakTimings
};