const  opticrewMechanicDetailsServices = require('../services/opticrewMechanicDetailsServices');

const getMechanicDetails = async (req, res, next) => {
  try {
    await opticrewMechanicDetailsServices.getMechanicDetails(req, res)
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(e);
  }
}


module.exports = {
    getMechanicDetails
}


