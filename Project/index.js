var express = require('express'),
	path = require('path'),
	config = require('./config/config.js'),
	knox = require('knox'),
	fs = require('fs'),
	os = require('os'),
	formidable = require('formidable'),
	gm = require('gm'),
	mongoose = require('mongoose').connect(config.dbURL),
	bodyParser = require('body-parser')


var app = express();
app.use(function(req, res, next) { //allow cross origin requests
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/views'));
app.use('/Controller/scripts.js',express.static(__dirname+'/Controller/scripts.js'));
app.use('/Controller/client.js',express.static(__dirname+'/Controller/client.js'));
app.use('/Controller/clientpage.js',express.static(__dirname+'/Controller/clientpage.js'));
app.use('/Controller/details.js',express.static(__dirname+'/Controller/details.js'));
app.use('/Controller/routes.js',express.static(__dirname+'/Controller/routes.js'));
app.use('/Controller/editview.js',express.static(__dirname+'/Controller/editview.js'));
app.use('/Controller/galleryedit.js',express.static(__dirname+'/Controller/galleryedit.js'))
app.use('/images/logo.jpg',express.static(__dirname+'/images/logo.jpg'));



app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 8090);
app.set('host', config.host);

var knoxClient = knox.createClient({
	key: config.S3AccessKey,
	secret: config.S3Secret,
	bucket: config.S3Bucket
})

var server = require('http').createServer(app);
var io = require('socket.io')(server);

require('./routes/routes.js')(express, app, formidable, fs, os, gm, knoxClient, mongoose, io);

server.listen(app.get('port'), function(){
	console.log('PhotoGRID Running on port: ' + app.get('port'));
})
