const MECHANIC_DETAILS  = require("../constants/mechanic_details");
const SHIFT_BREAK_TIMINGS = require("../constants/shift_breaktimings");

const shiftTimings = async (req, res) => {
    try {
        let userId, shiftStart, shiftEnd, nextShiftStartTime, currentDateTime, formattedTime, currentDate, mechShiftNo, mechShiftDetails;
        
        userId = req.query.userId;
       
        //to get the time in 24 hr format
        currentDateTime = new Date();
        formattedTime = currentDateTime.getHours() + ":" + currentDateTime.getMinutes() + ":" + currentDateTime.getSeconds();
        currentDate = currentDateTime.getFullYear() + "-" + parseInt(currentDateTime.getMonth() + 1)  + "-" + currentDateTime.getDate();

        //to get the day number 
        daynumber = new Date().getDay();       
        mechShiftNo = MECHANIC_DETAILS[userId].shift;
        mechShiftDetails = SHIFT_BREAK_TIMINGS[daynumber].filter(x => {
            if(x.shiftNo === mechShiftNo)
                return x;
        });
        mechShiftDetails = mechShiftDetails[0]; //as user will belong to only single shift      
    
        if(mechShiftNo !== 3 ){
            shiftStart = currentDate + " " + mechShiftDetails.shiftStartTime;
            shiftEnd = currentDate + " " + mechShiftDetails.shiftEndTime;
            nextShiftStartTime = shiftEnd;
        }
        else{
            let nextDate = currentDateTime.getFullYear() + "-" + parseInt(currentDateTime.getMonth() + 1) + "-" + parseInt(currentDateTime.getDate() + 1);
            let prevDate = currentDateTime.getFullYear() + "-" + parseInt(currentDateTime.getMonth() + 1) + "-" + parseInt(currentDateTime.getDate() - 1);
            
            if(formattedTime < "23:59:59"){                
                shiftStart = currentDate + " " + mechShiftDetails.shiftStartTime;
                shiftEnd = nextDate + " " + mechShiftDetails.shiftEndTime;
                nextShiftStartTime = shiftEnd;
            }
            else{
                shiftStart = prevDate + " " + mechShiftDetails.shiftStartTime;
                shiftEnd = currentDate + " " + mechShiftDetails.shiftEndTime;
                nextShiftStartTime = shiftEnd;
            }
        }

        return {
            shiftStart: shiftStart,
            shiftEnd: shiftEnd,
            nextShiftStartTime: nextShiftStartTime
        };
    }
    catch (err) {
        console.log("Error - ", err);
        res.status(500).render('error', { error: err })
    }
}

module.exports = {
    shiftTimings
};


