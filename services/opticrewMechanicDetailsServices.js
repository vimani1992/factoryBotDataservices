const MECHANIC_DETAILS = require("../constants/mechanic_details");
const JOB_DETAILS = require('../constants/job_details');
const MechanicDetails = require("../common/MechanicDetails");

const getMechanicDetails = async (req, res) => {
    try {
        if (!req.query.userId) {
            res.status(400).send("UserId not entered!")
        }

        //let userId = req.query.userId;
        // const mechanicList = []; 

        // if(MECHANIC_DETAILS[userId]){
        //     mechanicList.push({
        //         "workerSNO": MECHANIC_DETAILS[userId].workerSNO,
        //         "nickname": MECHANIC_DETAILS[userId].nickname,
        //         "subarea": MECHANIC_DETAILS[userId].subarea,
        //         "shift": MECHANIC_DETAILS[userId].shift,
        //         "workerStatus": MECHANIC_DETAILS[userId].workerStatus,
        //         "jobList" : JOB_DETAILS.filter(x => {
        //             if(x.workerSNO === userId)
        //                 return x;
        //         })
        //     });
        // }
        let mechanicList = await MechanicDetails.MechanicDetails(req, res);

        if (mechanicList.length > 0) {
            res.send(mechanicList);
        }
        else {
            res.send("Mechanic not found.");
        }
    }
    catch (err) {
        console.log("Error - ", err);
        res.status(500).render('error', { error: err })
    }
};

module.exports = {
    getMechanicDetails
};