const express = require('express')

const ticketController = require('../controllers/ticketController');
const opticrewSubareaController = require('../controllers/opticrewSubareaController');
const opticrewMechanicDetailsController = require('../controllers/opticrewMechanicDetailsController');
const opticrewShiftBreakTimingsController = require('../controllers/opticrewShiftBreakTimingsController');

const router = express.Router()

router.get('/getTicketsList', ticketController.getTicketList)
router.get('/getTicketDetails', ticketController.getTicketDetails)

router.get('/subarea',opticrewSubareaController.getSubareaDetails);
router.get('/mechanicdetails',opticrewMechanicDetailsController.getMechanicDetails);
router.get('/shiftbreaktimings',opticrewShiftBreakTimingsController.getShiftBreakTimings);

module.exports = router