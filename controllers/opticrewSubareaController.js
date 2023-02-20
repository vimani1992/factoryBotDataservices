const  opticrewSubareaService = require('../services/opticrewSubareaServices');

const getSubareaDetails = async (req, res, next) => {
  try {
    await opticrewSubareaService.getSubareaDetails(req, res)
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(e);
  }
}


module.exports = {
    getSubareaDetails
}


