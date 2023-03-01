//assuming the mechanic will always be logging in his shift
const MECHANIC_DETAILS  = require("../constants/mechanic_details");
const SHIFT_BREAK_TIMINGS = require("../constants/shift_breaktimings");

const shiftTimings = async (req, res) => {
    const HOURS_TO_MS = 2 * 60 * 60 * 1000; //convert 2 hrs buffer to milliseconds
    try {
        let userId, shiftStart, shiftEnd, nextShiftStartTime, currentDateTime, nextDate, prevDate, formattedTime, currentDate, mechShiftNo, mechShiftDetails, shiftBufferStart, shiftBufferEnd;
        
        userId = req.query.userId;
       
        //to get the time in 24 hr format
        currentDateTime = new Date();
        formattedTime = currentDateTime.getHours() + ":" + currentDateTime.getMinutes() + ":" + currentDateTime.getSeconds();
        currentDate = currentDateTime.getFullYear() + "-" + parseInt(currentDateTime.getMonth() + 1)  + "-" + currentDateTime.getDate();
        nextDate = currentDateTime.getFullYear() + "-" + parseInt(currentDateTime.getMonth() + 1) + "-" + parseInt(currentDateTime.getDate() + 1);
        prevDate = currentDateTime.getFullYear() + "-" + parseInt(currentDateTime.getMonth() + 1) + "-" + parseInt(currentDateTime.getDate() - 1);

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

        let bufferStartTime = new Date(shiftStart).getTime() - HOURS_TO_MS;
        bufferStartTime = new Date(bufferStartTime).toLocaleString('en-GB'); //"01/03/2023, 12:00:00"
        let datePartStart = bufferStartTime.split(',')[0].split('/').reverse().join('-');
        let timePartStart = bufferStartTime.split(',')[1];
        shiftBufferStart = datePartStart + timePartStart;

        let bufferEndTime = new Date(shiftEnd).getTime() + HOURS_TO_MS;
        bufferEndTime = new Date(bufferEndTime).toLocaleString('en-GB');
        let datePartEnd = bufferEndTime.split(',')[0].split('/').reverse().join('-');
        let timePartEnd = bufferEndTime.split(',')[1];
        shiftBufferEnd = datePartEnd + timePartEnd;
        

        return {
            shiftStart: shiftStart,
            shiftEnd: shiftEnd,
            nextShiftStartTime: nextShiftStartTime,
            shiftBufferStart: shiftBufferStart,
            shiftBufferEnd: shiftBufferEnd
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


