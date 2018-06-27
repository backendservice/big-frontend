var grpc = require('grpc');
var big_proto = grpc.load('big.proto').big;
var client = new big_proto.Big('192.168.0.20:50051', grpc.credentials.createInsecure());
var fs = require('fs');

var users = JSON.parse(fs.readFileSync('sample.json', 'utf8')).users;

users.forEach(function(user){

  user.age = parseInt(user.age)
  user.latitude = parseFloat(user.latitude)
  user.longitude = parseFloat(user.longitude)
  client.RegistUser(user, function(err, response) {
    console.log(response);
  });
})