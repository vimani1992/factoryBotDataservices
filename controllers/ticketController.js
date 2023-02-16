

const  ticketService    = require('../services/ticketServices')


const getTicketList = async (req, res, next) => {
  try {
    await ticketService.getTicketLists(req, res)
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
  }
}

const getTicketDetails = async (req, res, next) => {
    try {
      await ticketService.getTicketDetails(req, res)
      res.sendStatus(201)
      next()
    } catch(e) {
      console.log(e.message)
      res.sendStatus(500) && next(error)
    }
  }



module.exports = {
    getTicketList,
    getTicketDetails
}


