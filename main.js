// http 모듈을 요청;
// fs 모듈을 요청;
// url 모듈을 요청;
var http = require('http');
var fs = require('fs');
var url = require('url');

// ** 함수 정의. html 본문;
function templateHTML(title, list, body){
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${body}
  </body>
  </html>
  `;
}

// ** 함수 정의. 목록(반복문을 통해 표시);
//  변수선언. list = '<ul>';
//  변수선언. i=0;
//  i 값이 data 폴더 안 파일들의 length보다 작다면;
//  list = 아래 내용;
//  i 값에 1을 더해가며 while(반복)문의 조건에 부합할 때까지만 반복;
//  변수 list = 기존 list 형식 + </ul>;
function templateList(filelist){
  var list = '<ul>';
  var i = 0;
  while(i < filelist.length){
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list+'</ul>';
  return list;
}

// 변수선언. app = http 모듈의 createServer 메서드를 사용하여 서버 객체 생성;
// 변수선언. _url = url의 path를 요청;
// 변수선언. queryData = url 문자열 중 query를 객체로 변환하여 리턴;
// 변수선언. pathname = url 문자열 중 pathname을 객체로 변환하여 리턴;
// # 1. 만약 사용자가 요청한 url의 pathname이 '/' 라면 (*pathname은 첫 슬래시를 포함해서 호스트 이후부터 쿼리 이전까지의 URL의 경로 부분);
// # 2. 만약 queryData.id가 undefined라면;
// # 2. fs 모듈의 메서드인 readdir() 실행. 같은 위치의 data 폴더 안에 있는 파일들의 제목을 읽음;
// # 2. 변수선언. title = 'Welcome';
// # 2. 변수선언. description = 'Hello, Node.js';
// # 2. 변수선언. list = templateList() 함수실행;
// # 2. 변수선언. template = templateHTML() 함수 실행;
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
        fs.readdir('./data', function(error, filelist){
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = templateList(filelist);
          var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
          // # 2. 헤더 정보에 상태코드 200으로 응답;
          // # 2. 변수 template 출력;
          response.writeHead(200);
          response.end(template);
        })

        // # 2. 그렇지 않다면 (만약 queryData.id가 undefined이 아니라면);
        // # 2. fs 모듈의 메서드인 readdir() 실행. 같은 위치의 data 폴더 안에 있는 파일들의 제목을 읽음;
        // # 2. fs 모듈의 메서드인 readFile() 실행. readFile(읽고자 하는 파일 이름, 읽을 때 옵션, 파일이 읽혀진 후 호출될 함수);
        // # 2. 변수선언. title = queryData 객체의 id값;
        // # 2. 변수선언. list = templateList() 함수실행;
        // # 2. 변수선언. template = templateHTML() 함수실행;
      } else {
        fs.readdir('./data', function(error, filelist){
          fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
            var title = queryData.id;
            var list = templateList(filelist);
            var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
            // #2. 헤더 정보에 상태코드 200으로 응답;
            // #2. 변수 template 출력;
            response.writeHead(200);
            response.end(template);
          });
        });
      }

      // #1. 그렇지 않다면 (만약 사용자가 요청한 url의 pathname이 '/' 아니라면);
      // #1. 헤더 정보에 상태코드 404로 응답;
      // #1. 'Not found' 문구 출력;
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
//port 3000으로 서버를 실행;
app.listen(3000);
