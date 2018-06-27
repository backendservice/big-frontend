
var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var grpc = require('grpc');
var big_proto = grpc.load('big.proto').big;
var client = new big_proto.Big('192.168.0.20:50051', grpc.credentials.createInsecure());

app.use(express.static('public'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/hello/:name', function (req, res) {
  client.Hello({name: req.params.name}, function(err, response) {
  	res.send(response.message);
  });
});

app.post('/users', function (req, res) {
	req.body.age = parseInt(req.body.age)
	req.body.latitude = parseFloat(req.body.latitude)
	req.body.longitude = parseFloat(req.body.longitude)
  client.RegistUser(req.body, function(err, response) {
  	res.send(response.message);
  });
});

app.get('/search', function (req, res) {
	var obj = req.query;
	obj.age = parseInt(obj.age)
	obj.latitude = parseFloat(obj.latitude)
	obj.longitude = parseFloat(obj.longitude)
	obj.distance = parseInt(obj.distance)
  client.FindUser(obj, function(err, response) {
  	res.send(response);
  });
});

app.listen(8080, function () {
  console.log('BIG frontend listening on port 8080!');
});