/**
 * Created by bilal on 5/31/2015.
 */
/**
 * Static HTTP Server
 *
 * Create a server instance to serve files and data
 *
 */

// modules
var util = require('./config/config.js');
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var fs=require('fs');
var http = require( 'http' );
var url = require( 'url');


var dir='../client';
var port = util.serverConfiguration.systemPort ;    //8963,
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(dir));

/*
* connection to mongodb
* */
mongoose.connect('mongodb://'+util.serverConfiguration.databaseIp+'/'+util.serverConfiguration.databaseName); // 'mongodb://localhost/test'
var db = mongoose.connection;
db.on('error',function(){
        console.error('db connection error:');
    global.databaseConnection = false;
    });
db.once('open', function (callback) {
    console.log('connected to db successfully..');
    global.databaseConnection = true;
});

/*
* load all routes on startup from routes folder
* */
var routes = fs.readdirSync('./routes');
for( var route in routes){
    require('./routes/'+routes[route]).setRoutes(app);
}

app.listen(port, function() {
    console.log('server is listening on port ',port);
});