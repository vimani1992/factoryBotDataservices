const SUBAREA_DETAILS = require("../constants/area_subarea");
const MECHANIC_DETAILS = require("../constants/mechanic_details");
const SubAreaList = require("../common/SubAreaDetails");

const getSubareaDetails = async (req, res) => {
    try {
        if (!req.query.userId) {
            res.status(400).send("UserId not entered!")
        }
        let subareaDetails;
        subareaDetails = await SubAreaList.subAreas(req, res);

        if (subareaDetails) {
            res.send(subareaDetails);
        }
        else {
            res.status(400).send("Mechanic or Mechanic's areaid/subarea details not found.");
        }
    }
    catch (err) {
        console.log("Error - ", err);
        res.status(500).render('error', { error: err })
    }
};

module.exports = {
    getSubareaDetails
};