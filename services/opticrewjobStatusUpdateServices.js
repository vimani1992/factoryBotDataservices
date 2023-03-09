
const jobDetails = require("../constants/job_details");

const jobStatusUpdate = async (req, res) => {
    try {
        if (!req.body.userId && !req.body.scheduleID && !req.body.jobID && !req.body.job_status) {
            res.status(400).send("Request payload is not valid")
        }
        jobDetails.forEach(ele => {
            if (ele.scheduleID === req.body.scheduleID && ele.jobID === parseInt(req.body.jobID)) {
                console.log("++++++inside if condition+++++");
                ele.job_status = req.body.job_status;
                ele.actualStarttime = req.body.job_status == "In Progress" ? req.body.currentTimeEpoch : ele.actualStarttime
                ele.actualEndtime = req.body.job_status == "Completed" ? req.body.currentTimeEpoch : ele.actualEndtime;
                return ele;
            }

        })
        res.send(jobDetails);


    }
    catch (err) {
        console.log("Error - ", err);
        res.status(500).render('error', { error: err })
    }
};

module.exports = {
    jobStatusUpdate
};