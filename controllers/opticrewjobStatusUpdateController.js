const  opticrewjobStatusUpdateServices = require('../services/opticrewjobStatusUpdateServices');

const jobStatusUpdate = async (req, res, next) => {
  try {
    await opticrewjobStatusUpdateServices.jobStatusUpdate(req, res)
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(e);
  }
}


module.exports = {
    jobStatusUpdate
}