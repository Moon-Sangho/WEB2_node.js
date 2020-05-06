// http 모듈을 요청;
// fs 모듈을 요청;
// 변수선언. app = http 모듈의 createServer 메서드를 사용하여 서버 객체 생성;
// 변수선언. _url = url 주소를 요청;
// 만약 사용자가 요청한 url의 path가 '/' 라면;
// url = '/index.html' 로 출력;

var http = require('http');
var fs = require('fs');
var app = http.createServer(function(request,response){
    var url = request.url;
    if(url == '/'){
      url = '/index.html';
    }

    // 만약 사용자가 요청한 url의 path가 '/favicon.ico' 라면;
    // 헤더 정보에 상태코드 404로 응답;
    // 컨텐츠 출력 완료;

    if(url == '/favicon.ico'){
      response.writeHead(404);
      response.end();
      return;
    }

    // 헤더 정보에 상태코드 200으로 응답;
    // 동기식으로 파일을 읽음;
    // port 3000으로 서버를 실행;

    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + url));
});
app.listen(3000);
