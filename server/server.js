var http=require('http');
var fs=require('fs');

var server=http.createServer(function(request,response){
	if(request.url==='/'){
	  response.writeHead(200)
	  fs.readFile('index.html',function(err,content){
	  	htmlString=content.toString()
	  	response.end('xiagai')
	  })
	}else{
		
	}
})

server.listen(8080);
console.log('success');