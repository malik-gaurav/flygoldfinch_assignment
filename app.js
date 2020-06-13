var express = require("express");
var app = express();
var request = require('request');

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req,res){
	res.render("home");
});
app.get("/home", function(req,res){
	res.render("home");
});
app.get("/time", function(req,res){
	res.render("time");
});
app.get("/data", function(req,res){
	request('https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole',function(error,response,body){
	if(!error&&response.statusCode==200){
		var parsedData = JSON.parse(body);
		var names =[]
		for(parser in parsedData){
			names.push(parsedData[parser]["first"]+" "+parsedData[parser]["last"]);
		}
		console.log(names);
		res.render("data",{names:names});
	}
});
});

var port = process.env.port || 3000;
app.listen(port, process.env.IP, function(){
	console.log("The server is running!");
});