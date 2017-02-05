/**
 * Created by reza on 2/2/17.
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://reza:reza@ds139979.mlab.com:39979/reza-node-api');

var Bear = require('./app/models/bear');

var port = process.env.PORT || 8080;

var router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function (req, res) {
    res.json({message: 'hooray! welcome to our api!'});
});

router.route('/bear')
    .post(function (req, res) {
        var bear = new Bear();
        bear.name = req.body.name;
        bear.save(function (err) {
            if (err)
                res.send(err);
            res.json({message: 'Bear created!'});
        });
    });

router.route('/bears')
    .post(function (req, res) {

    })

    .get(function (req, res) {
        Bear.find(function (err, bears) {
            if (err)
                res.send(err);
            res.json(bears);
        });
    });


router.route('/bears/:bear_id')
    .get(function (req, res) {
        Bear.findById(req.params.bear_id, function (err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })
    .put(function (req, res) {
        Bear.findById(req.params.bear_id, function (err, bear) {
            if (err)
                res.send(err);

            bear.name = req.body.name;
            bear.save(function (err) {
                if (err)
                    res.send(err);
                res.json({message: 'Bear updated!'});

            });

        });
    })
    .delete(function (req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function (err, bear) {
            if (err)
                res.send(err);
            res.json({message: 'Successfully deleted'});
        })
    });

// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port);

console.log('Magic happens on port ' + port);