const SHIFT_BREAK_TIMINGS = require("../constants/shift_breaktimings");
const MECHANIC_DETAILS = require("../constants/mechanic_details");

const MechanicShiftBreakTime = async (req, res) => {
    let breakList = [];

    //to get the day number 
    daynumber = new Date().getDay()

    const dayDetails = SHIFT_BREAK_TIMINGS[daynumber]
    dayDetails.forEach(ele => {
        breakList.push({
            "breakName": ele.breakDescription,
            "breakDescription": ele.breakDescription,
            "breakStartTime": ele.breakStartTime,
            "breakEndTime": ele.breakEndTime,
            "shiftNo": ele.shiftNo
        },{
            "breakName": ele.mealDescription,
            "breakDescription": ele.mealDescription,
            "breakStartTime": ele.mealStartTime,
            "breakEndTime": ele.mealEndTime,
            "shiftNo": ele.shiftNo
        })
    });

    //console.log("breakList: ",breakList);
    return breakList;
}

module.exports = {
    MechanicShiftBreakTime
};