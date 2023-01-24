// create a nodejs express server
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const configRoutes = require('./routes/config');

const port = process.env.PORT || 3007; // Read from env

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const router = express.Router();
// middleware to use for all requests
router.use((req, res, next) => {
  // do logging
  console.log(req.baseUrl, req.body);
  next(); // make sure we go to the next routes and don't stop here
});
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here
// REGISTER OUR ROUTES -------------------------------
router.patch('/config', configRoutes.patch);
router.get('/config', configRoutes.get);
router.put('/config', configRoutes.put);

// all of our routes will be prefixed with /api
app.use('/api', router);
// START THE SERVER
// =============================================================================
app.listen(port);
console.log(`Magic happens on port ${port}`);
