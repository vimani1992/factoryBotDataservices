/**
 * @name factory_bot_app_backend
 * @author Naren Kumar
 * @createdOn 31-Jan-2023
 * @description APIs support front end API calls
 * @returns Depends on request from Flutter
 * @modifiedBy
 * @modifiedOn
 * @modificationSummary
 * @updated
 */

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { OPEN_TICKETS } = require("./constants/ticketDetails");
const port = process.env.PORT;
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Factory bot data services listening on port ${port}`)
})

app.get("/getTicketsList", async function (req, res) {
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
        userTickets = [... userTickets];
        if(userTickets.length > 0) {
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
})

app.get("/getTicketDetails", async function (req, res) {
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
        if(returnTicketObj) {
            res.json(returnTicketObj);
        }
        else {
            res.status(400).send(`Ticket details of ticketId - ${ticketId} is not available!`);
        }
    }
    catch (err) {
        res.status(500).render('error', { error: err });
    }
})
