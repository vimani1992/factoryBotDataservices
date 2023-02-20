const  opticrewShiftBreakTimingsServices = require('../services/opticrewShiftBreakTimingsServices');

const getShiftBreakTimings = async (req, res, next) => {
  try {
    await opticrewShiftBreakTimingsServices.getShiftBreakTimings(req, res)
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(e);
  }
}


module.exports = {
    getShiftBreakTimings
}

