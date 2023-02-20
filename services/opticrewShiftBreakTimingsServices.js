const SHIFT_BREAK_TIMINGS  = require("../constants/shift_breaktimings");

const getShiftBreakTimings = async (req, res) => {
    try {
        if (!req.query.userId) {
            res.status(400).send("UserId not entered!")
        }
        
        let userId = req.query.userId;
        const currentTime = Date.now(); 

        console.log(currentTime);
        res.send(true);
    }
    catch (err) {
        console.log("Error - ", err);
        res.status(500).render('error', { error: err })
    }
};

module.exports = {
    getShiftBreakTimings
};