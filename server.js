// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

var port = process.env.PORT || 8080;        // set our port

var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:password@ds159330.mlab.com:59330/scubalogs'); // connect to our data

// mongoose.connection.on('error', function (err) {
//     console.log(err);
// });

var DiveLog = require('./models/divelog');
var DiveLocation = require('./models/diveLocation');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// on routes that end in /divelogs
// ----------------------------------------------------
router.route('/divelogs')

    //     {
    // 	"username": "Bas",
    // 	"date": "11-4-2017",
    // 	"divelogData": {
    // 		"location" : "Toolenburg",
    // 		"maxDepth" : 10,
    // 		"avgDepth" : 5,
    // 		"surfaceTemperature": 12,
    // 		"depthTemperature" : 5,
    // 		"diveTime": 55,
    // 		"buddy": "Lennart"
    // 	}
    // }

    // create a divelog
    .post(function (req, res) {
        var divelog = new DiveLog();

        divelog.username = req.body.username;
        divelog.date = req.body.date;
        divelog.divelogData = req.body.divelogData;

        divelog.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Divelog created!' });
        });

    })

    // Get all the divelogs
    .get(function (req, res) {
        DiveLog.find(function (err, divelogs) {
            if (err)
                res.send(err);

            res.json(divelogs);
        });
    });


// ----------------------------------------------------
router.route('/divelogs/:divelog_id')
    // get a single divelog by id.
    .get(function (req, res) {
        DiveLog.findById(req.params.divelog_id, function (err, divelog) {
            if (err)
                res.send(err);
            res.json(divelog);
        });
    });


// ----------------------------------------------------
router.route('/divelogs/divelocations/:location_name')

    // get the divelogs with a location name
    .get(function (req, res) {

        // find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
        DiveLog.find({ 'divelogData.location': req.params.location_name }, function (err, divelog) {
            if (err)
                res.send(err);
            res.json(divelog);
        })
    });



router.route('/divelocations')

    // create a divelocation
    .post(function (req, res) {
        var diveLocation = new DiveLocation();

        diveLocation.name = req.body.name;
        diveLocation.description = req.body.description
        diveLocation.location = req.body.location

        diveLocation.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Divelocation created!' });
        });

    })

    // Get all the divelocations
    .get(function (req, res) {
        DiveLocation.find(function (err, divelocations) {
            if (err)
                res.send(err);

            res.json(divelocations);
        });
    });


router.route('/divelocations/:location_name')

    .get(function (req, res) {

        // find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
        DiveLocation.findOne({ 'name': req.params.location_name }, function (err, divelocation) {
            if (err)
                res.send(err);
            res.json(divelocation);
        })
    });




// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);




// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);