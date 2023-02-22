const  opticrewMechanicShiftRecordsService = require('../services/opticrewMechanicShiftRecordsServices');

const getMechanicShiftRecords = async (req, res, next) => {
  try {
    await opticrewMechanicShiftRecordsService.getMechanicShiftRecords(req, res)
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(e);
  }
}


module.exports = {
  getMechanicShiftRecords
}


