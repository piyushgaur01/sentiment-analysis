var indico = require('indico.io');
var express = require('express');
var helmet = require('helmet');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = new express();
var port = process.env.PORT || 8080;

app.use(helmet({
    noCache: true
  }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.use(morgan('combined'));

app.get('/', function(req, res){
    res.send('Default route of Sentiment Analysis API.');
});

app.post('/query',function(req, res){
    var body = req.body;
    var bodyKeys = Object.keys(body);
    var bodyLength = bodyKeys.length;

    var settings = {"api_key": "8df7bf59da7a70de901cf3f8ff4336cb"};
    var response = function(res) { console.log(res); }
    var logError = function(err) { console.log(err); }
    var inputArray = [];

    console.log(bodyKeys);
    console.log(bodyLength);
    bodyKeys.forEach(function(key) {
        inputArray.push(body[key]);
    }, this);
    console.log(inputArray);
    indico.sentiment(inputArray, settings)
    .then(function(success){
        res.send(success);
    }, function(err){
        console.log(err);
    })
    .catch(logError);
});

app.listen(port, function () {
    console.log('Sentiment Analysis API listening on port: '+port);
});