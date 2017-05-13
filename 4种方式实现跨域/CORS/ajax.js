
function ajax(opts){
 opts.success = opts.success||function(){}
 opts.error=opts.error||function(){}
 opts.type=opts.type||'json'
 opts.data=opts.data||{}
 var dataStr = ''
 for(var key in opts.data){
     dataStr += key+'='+opts.data[key]+'&'
 }
 var xmlHttp=new XMLHttpRequest()
 xmlHttp.onreadystatechange=function(){
     if(xmlHttp.readyState===4){
         if(xmlHttp.status>=200 && (xmlHttp.status<300||xmlHttp.status===304)){
             if(opts.dataType==="text"){
                opts.success(xmlHttp.responseText)
             }
             if(opts.dataType==="json"){
               var json = JSON.parse(xmlHttp.responseText)
                opts.success(json)
             }
         }else{
             opts.error(xmlHttp.status)
         }
     }
  }

  dataStr = dataStr.substr(0, dataStr.length-1)
  if(opts.type.toLowerCase()==='post'){
   xmlHttp.open(opts.type,opts.url,true)
   xmlHttp.setRequestHeader('Context-type','application/x-www-form-urlencoded')
   xmlHttp.send(dataStr)
  }
  if(opts.type.toLowerCase()==='get'){
   xmlHttp.open(opts.type,opts.url+'?'+dataStr,true)
   xmlHttp.send()
  }
}
// https://imququ.com/post/four-ways-to-post-data-in-http.html