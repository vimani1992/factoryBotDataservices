const SUBAREA_DETAILS  = require("../constants/area_subarea");
const MECHANIC_DETAILS  = require("../constants/mechanic_details");

const getSubareaDetails = async (req, res) => {
    try {
        if (!req.query.userId) {
            res.status(400).send("UserId not entered!")
        }
        
        let userId = req.query.userId;
        let areaId, subareaDetails;
        // console.log("userId : ", userId);
        // console.log("MECHANIC_DETAILS", MECHANIC_DETAILS);
        // console.log("MECHANIC_DETAILS.userId", MECHANIC_DETAILS[userId]);

        if(MECHANIC_DETAILS[userId]){
            areaId = MECHANIC_DETAILS[userId].areaId;
            if(areaId){
                subareaDetails = SUBAREA_DETAILS[areaId].subarea;
            }
        }

        if (subareaDetails.length > 0) {
            res.send(subareaDetails);
        }
        else {
            res.send("Mechanic or Mechanic's areaid/subarea details not found.");
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