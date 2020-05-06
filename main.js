// http 모듈을 요청;
// fs 모듈을 요청;
// url 모듈을 요청;

var http = require('http');
var fs = require('fs');
var url = require('url');

// 변수선언. app = http 모듈의 createServer 메서드를 사용하여 서버 객체 생성;
// 변수선언. _url = url의 path를 요청;
// 변수선언. queryData = url 문자열을 객체로 변환하여 리턴;
// 만약 사용자가 요청한 url의 path가 '/' 라면;
// url path = '/index.html' 로 출력;

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    // console.log(queryData) <-활성화 후 주소창에 localhost:3000/?id=HTML 입력 시 cmd창에 객체로 출력됨 -> {id : HTML}
    if(_url == '/'){
      _url = '/index.html';
    }

    // 만약 사용자가 요청한 url의 path가 '/favicon.ico' 라면;
    // 헤더 정보에 상태코드 404로 응답;
    // 컨텐츠 출력 완료;

    if(_url == '/favicon.ico'){
      response.writeHead(404);
      response.end();
      return;
    }

    // 헤더 정보에 상태코드 200으로 응답;
    // queryData 객체 중 id값을 출력;
    // port 3000으로 서버를 실행;

    response.writeHead(200);
    response.end(queryData.id);
});
app.listen(3000);
