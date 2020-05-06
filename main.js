// http 모듈을 요청;
// fs 모듈을 요청;
// url 모듈을 요청;

var http = require('http');
var fs = require('fs');
var url = require('url');

// 변수선언. app = http 모듈의 createServer 메서드를 사용하여 서버 객체 생성;
// 변수선언. _url = url의 path를 요청;
// 변수선언. queryData = url 문자열을 객체로 변환하여 리턴;
// 변수선언. title = queryData 객체의 id값;
// 만약 사용자가 요청한 url의 path가 '/' 라면;
// 변수 title = Welcome 으로 출력;

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    // console.log(queryData) <-활성화 후 주소창에 localhost:3000/?id=HTML 입력 시 cmd창에 객체로 출력됨 -> {id : HTML}
    if(_url == '/'){
      title = 'Welcome';
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
    // 변수선언. template = 1.html 내용 복사 후, 페이지별로 바뀌어야할 부분들을 변수로 선언한 뒤, 본문에 삽입시킴;
    response.writeHead(200);
    var template = `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <ul>
        <li><a href="/?id=HTML">HTML</a></li>
        <li><a href="/?id=CSS">CSS</a></li>
        <li><a href="/?id=JavaScript">JavaScript</a></li>
      </ul>
      <h2>${title}</h2>
      <p><a href="https://www.w3.org/TR/html5/" target="_blank" title="html5 speicification">Hypertext Markup Language (HTML)</a> is the standard markup language for <strong>creating <u>web</u> pages</strong> and web applications.Web browsers receive HTML documents from a web server or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.
      <img src="coding.jpg" width="100%">
      </p><p style="margin-top:45px;">HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects, such as interactive forms, may be embedded into the rendered page. It provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes and other items. HTML elements are delineated by tags, written using angle brackets.
      </p>
    </body>
    </html>
    `;

    // 변수 template 출력;
    response.end(template);
});
//port 3000으로 서버를 실행;
app.listen(3000);
