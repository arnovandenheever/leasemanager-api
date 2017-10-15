var express       = require('express');  
var cors          = require('cors')
var app           = express();                 
var bodyParser    = require('body-parser');
var validator     = require('express-validator');
var routesApi     = require('./route/routes');

var port = process.env.PORT || 8000;      

app.use(cors())                

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(validator());

app.get('/', function(req, res) {
    res.status(200);
    res.send({ message: 'Welcome to our LeaseManager API!' });   
});

app.use('/api', function(req, res, next) {

    var contype = req.headers['content-type'];
    if (!contype || contype.indexOf('application/json') !== 0){
        res.status(400).send({status:400, message: 'Invalid request', type:'Content-Type <> application/json'});
    } 
    next();
});

app.use('/api', routesApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// [SH] Catch unauthorised errors
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({"message" : err.name + ": " + err.message});
    } else {
        res.json({"message" : err.status + ": " + err.message});
    }
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.status(err.status).send('error', {
        message: err.message,
        error: err
    })
});

app.listen(port);

console.log('Magic happens on port ' + port);