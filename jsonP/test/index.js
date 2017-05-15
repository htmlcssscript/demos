var http = require('http')
var fs = require('fs')
var url = require('url')

//console.log(Object.keys(http))
var port = process.env.PORT || 8888;

var server = http.createServer(function(request, response){

  var temp = url.parse(request.url, true)
  var path = temp.pathname
  var query = temp.query
  var method = request.method

  //从这里开始看，上面不要看

  if(path === '/'){  // 如果用户请求的是 / 路径
    var string = fs.readFileSync('./index.html')  
    response.setHeader('Content-Type', 'text/html;charset=utf-8')  
    response.end(string)   
  }else if(path === '/style.css'){   
    var string = fs.readFileSync('./style.css')
    response.setHeader('Content-Type', 'text/css')

  }else if(path === '/main.js'){  
    console.log(query)
    var string = fs.readFileSync('./main.js','utf8')
    let dataBase = {
      '1':{
        "name": '大乔'
      },
      '2':{
        "name": '小乔'
      }
    }

    let result = dataBase['1']
    result = JSON.stringify(result)
    let fn = query.content
    
    
    response.setHeader('Content-Type', 'application/javascript')
    var temp = string.replace('%data%', result)
                     .replace('%functionName%',fn)

    response.end(temp)

    }
  })

server.listen(port)
console.log('监听 ' + port + ' 成功，请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
