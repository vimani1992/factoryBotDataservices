const express = require('express')

const ticketController = require('../controllers/ticketController')

const router = express.Router()

router.get('/getTicketsList', ticketController.getTicketList)
router.get('/getTicketDetails', ticketController.getTicketDetails)

module.exports = router