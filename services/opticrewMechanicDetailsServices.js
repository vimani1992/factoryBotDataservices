const MECHANIC_DETAILS = require("../constants/mechanic_details");
const JOB_DETAILS = require('../constants/job_details');
const MechanicDetails = require("../common/MechanicDetails");

const getMechanicDetails = async (req, res) => {
    try {
        if (!req.query.userId) {
            res.status(400).send("UserId not entered!")
        }
        let mechanicList = await MechanicDetails.MechanicDetails(req, res);

        if (mechanicList.length > 0) {
            res.send(mechanicList);
        }
        else {
            res.status(400).send("Mechanic not found.");
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