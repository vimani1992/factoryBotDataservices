const MECHANIC_DETAILS  = require("../constants/mechanic_details");
const JOB_DETAILS = require('../constants/job_details');

const MechanicDetails= async (req, res) => {
    let userId = req.query.userId;
    const mechanicList = []; 

    if(MECHANIC_DETAILS[userId]){
        mechanicList.push({
            "workerSNO": MECHANIC_DETAILS[userId].workerSNO,
            "nickname": MECHANIC_DETAILS[userId].nickname,
            "subarea": MECHANIC_DETAILS[userId].subarea,
            "shift": MECHANIC_DETAILS[userId].shift,
            "workerStatus": MECHANIC_DETAILS[userId].workerStatus,
            "jobList" : JOB_DETAILS.filter(x => {
                if(x.workerSNO === userId)
                    return x;
            })
        });
    }
    return mechanicList;
}

module.exports = {
    MechanicDetails
};