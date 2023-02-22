const MECHANIC_DETAILS  = require("../constants/mechanic_details");
const SUBAREA_DETAILS  = require("../constants/area_subarea");

const subAreas= async (req, res) => {

    
    let userId = req.query.userId;
    let areaId, subareaDetails;

    if(MECHANIC_DETAILS[userId]){
        areaId = MECHANIC_DETAILS[userId].areaId;
        if(areaId){
            subareaDetails = SUBAREA_DETAILS[areaId].subarea;
        }
    }
    return subareaDetails;

}

module.exports = {
    subAreas
};