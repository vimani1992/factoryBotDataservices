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

const opticrewRoutes = require('./routes/opticrew');
const cors = require('cors')

//const port = process.env.PORT;
const port = 3000;
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('App is working'))

app.use(cors())
app.use('/api/opticrew', opticrewRoutes)

app.listen(port, () => console.log(`Factory bot data services listening on port ${port}`))

module.exports = {
  app
}