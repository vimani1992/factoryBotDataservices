

const { OPEN_TICKETS } = require("../constants/ticketDetails");

/*
  * if you need to make calls to additional tables, data stores (Redis, for example), 
  * or call an external endpoint as part of creating the blogpost, add them to this service
*/
const getTicketLists = async (req, res) => {
    try {
        if (!req.query.userId) {
            res.status(400).send("UserId not entered!")
        }
        let userId = req.query.userId;
        console.log("userId : ", userId);
        let userTickets = new Set();
        for (let ticketObj of OPEN_TICKETS) {
            if (ticketObj.assignedToUser === userId) {
                userTickets.add(ticketObj.ticketId);
            }
        }
        userTickets = [...userTickets];
        if (userTickets.length > 0) {
            res.send(userTickets);
        }
        else {
            res.status(400).send("No tickets available for this userId");
        }
    }
    catch (err) {
        console.log("Error - ", err);
        res.status(500).render('error', { error: err })
    }
}


const getTicketDetails = async (req, res) => {
    try {
        if (!req.query.ticketId) {
            res.status(400).send("TicketId not entered!")
        }
        let ticketId = req.query.ticketId;
        let returnTicketObj = null;
        for (let ticketObj of OPEN_TICKETS) {
            if (ticketObj.ticketId === ticketId) {
                returnTicketObj = ticketObj;
                break;
            }
        }
        if (returnTicketObj) {
            res.json(returnTicketObj);
        }
        else {
            res.status(400).send(`Ticket details of ticketId - ${ticketId} is not available!`);
        }
    }
    catch (err) {
        res.status(500).render('error', { error: err });
    }
}


module.exports = {
    getTicketLists,
    getTicketDetails

}