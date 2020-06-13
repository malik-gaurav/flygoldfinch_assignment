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
		console.log("names sent");
		res.render("data",{names:names});
	}
	});
});
app.get("/currency", function(req,res){
	res.render("currency");
});
app.get("/results", function(req,res){
	var from = req.query.from_currency;
	var to = req.query.to_currency;
	var amount = req.query.amount;
	var code = from+"_"+to;
	var url = "https://free.currconv.com/api/v7/convert?q="+code+"&compact=ultra&apiKey=dd8e835c3d0a875afe5e";
	request(url, function(error, response, body){
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body)
            res.render("results", {value: data[code]*amount});
        }
    });
});

var port = process.env.port || 3000;
app.listen(port, process.env.IP, function(){
	console.log("The server is running!");
});