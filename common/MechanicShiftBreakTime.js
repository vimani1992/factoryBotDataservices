const SHIFT_BREAK_TIMINGS = require("../constants/shift_breaktimings");
const MECHANIC_DETAILS = require("../constants/mechanic_details");

const MechanicShiftBreakTime = async (req, res) => {
    let breakList = [];

    //to get the day number 
    daynumber = new Date().getDay();

    let d = new Date();

    let currentYear = d.getUTCFullYear();
    let currentMonth = d.getUTCMonth()
    let currentDate = d.getUTCDate();

    const dayDetails = SHIFT_BREAK_TIMINGS[daynumber]
    dayDetails.forEach(ele => {
        if(ele.shiftNo === 3){
            currentDate = currentDate + 1
        }
        breakList.push({
            "breakName": ele.breakDescription,
            "breakDescription": ele.breakDescription,
            "breakStartTime": new Date(currentYear, currentMonth, currentDate, ele.breakStartTime.split(':')[0],ele.breakStartTime.split(':')[1],ele.breakStartTime.split(':')[2]).getTime(),
            "breakEndTime": new Date(currentYear, currentMonth, currentDate, ele.breakEndTime.split(':')[0],ele.breakEndTime.split(':')[1],ele.breakEndTime.split(':')[2]).getTime(),
            "shiftNo": ele.shiftNo
        },{
            "breakName": ele.mealDescription,
            "breakDescription": ele.mealDescription,
            "breakStartTime": new Date(currentYear, currentMonth, currentDate, ele.mealStartTime.split(':')[0],ele.mealStartTime.split(':')[1],ele.mealStartTime.split(':')[2]).getTime(),
            "breakEndTime": new Date(currentYear, currentMonth, currentDate, ele.mealEndTime.split(':')[0],ele.mealEndTime.split(':')[1],ele.mealEndTime.split(':')[2]).getTime(),
            "shiftNo": ele.shiftNo
        })
    });

    //console.log("breakList: ",breakList);
    return breakList;
}

module.exports = {
    MechanicShiftBreakTime
};