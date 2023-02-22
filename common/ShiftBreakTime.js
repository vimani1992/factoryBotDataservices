const SHIFT_BREAK_TIMINGS = require("../constants/shift_breaktimings");
const MECHANIC_DETAILS = require("../constants/mechanic_details");

const ShiftBreakTime = async (req, res) => {


    let userId = req.query.userId;
    let breakList = [];

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
                if (ele.shiftNo === mechanicShift) {
                    breakList.push({
                        "breakName": ele.breakName,
                        "breakDescription": ele.breakDescription,
                        "breakStartTime": ele.breakStartTime,
                        "breakEndTime": ele.breakEndTime
                    });
                }
                return breakList;
            }
        })
    }
    return breakList;
}

module.exports = {
    ShiftBreakTime
};