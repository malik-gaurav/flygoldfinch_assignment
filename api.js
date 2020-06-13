var request = require('request');
request('https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole',function(error,response,body){
	if(!error&&response.statusCode==200){
		var parsedData = JSON.parse(body);
		//console.log(parsedData[0]["first"]);
		var names =[]
		for(parser in parsedData){
			names.push(parsedData[parser]["first"]+" "+parsedData[parser]["last"]);
		}
		console.log(names);
	}
});