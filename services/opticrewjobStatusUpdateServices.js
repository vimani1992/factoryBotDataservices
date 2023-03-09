
const jobDetails = require("../constants/job_details");

const jobStatusUpdate = async (req, res) => {
    try {
        if(!req.body.userId && !req.body.scheduleID && !req.body.jobID && !req.body.job_status)
        {
            res.status(400).send("Request payload is not valid")
        }
        const test = jobDetails.map(ele => { 
            console.log(ele);
            if(ele.scheduleID === req.body.scheduleID && ele.jobID === req.body.jobID)
            {
                ele.job_status = req.body.job_status;
                ele.actualStarttime = req.body.job_status == "In Progress" ? req.body.currentTimeEpoch : ele.actualStarttime
                ele.actualEndtime = req.body.job_status == "Completed" ? req.body.currentTimeEpoch : ele.actualEndtime
            }
        });
        console.log(test);
    }
    catch (err) {
        console.log("Error - ", err);
        res.status(500).render('error', { error: err })
    }
};

module.exports = {
    jobStatusUpdate
};