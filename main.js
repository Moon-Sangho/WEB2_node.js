// http 모듈을 요청;
// fs 모듈을 요청;
// url 모듈을 요청;
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// template 객체
// 1. html 본문 함수,
// 2. 글 목록 함수 삽입
//    변수선언. list = '<ul>';
//    변수선언. i=0;
//    i 값이 data 폴더 안 파일들의 length보다 작다면;
//    list = 아래 내용;
//    i 값에 1을 더해가며 while(반복)문의 조건에 부합할 때까지만 반복;
//    변수 list = 기존 list 형식 + </ul>;
var template = {
  HTML: function(title, list, body, control){
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
      ${control}
      ${body}
    </body>
    </html>
    `;
  }, list: function(filelist){
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length){
      list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  }
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
// # 2. 변수선언. list = template.list() 함수실행;
// # 2. 변수선언. html = template.HTML() 함수 실행;
// # 2. template.HTML() 함수의 'body' 요소;
// # 2. template.HTML() 함수의 'control' 요소 (update 기능 없음);
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
        fs.readdir('./data', function(error, filelist){
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = template.list(filelist);
          var html = template.HTML(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`
          );
          // # 2. 헤더 정보에 상태코드 200으로 응답;
          // # 2. 변수 template 출력;
          response.writeHead(200);
          response.end(html);
        });

        // # 2. 그렇지 않다면 (만약 queryData.id가 undefined이 아니라면);
        // # 2. fs 모듈의 메서드인 readdir() 실행. 같은 위치의 data 폴더 안에 있는 파일들의 제목을 읽음;
        // # 2. fs 모듈의 메서드인 readFile() 실행. readFile(읽고자 하는 파일 이름, 읽을 때 옵션, 파일이 읽혀진 후 호출될 함수);
        // # 2. 변수선언. title = queryData 객체의 id값;
        // # 2. 변수선언. list = template.list() 함수실행;
        // # 2. 변수선언. html = template.HTML() 함수실행;
        // # 2. template.HTML() 함수의 'body' 요소;
        // # 2. template.HTML() 함수의 'control' 요소 (update 기능 추가);
        // # 2. form tag = delete 기능 추가;
      } else {
        fs.readdir('./data', function(error, filelist){
          fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
            var title = queryData.id;
            var list = template.list(filelist);
            var html = template.HTML(title, list,
              `<h2>${title}</h2>${description}`,
              ` <a href="/create">create</a>
                <a href="/update?id=${title}">update</a>
                <form action="delete_process" method="post">
                  <input type="hidden" name="id" value="${title}">
                  <input type="submit" value="delete">
                </form>`
            );
            // #2. 헤더 정보에 상태코드 200으로 응답;
            // #2. 변수 template 출력;
            response.writeHead(200);
            response.end(html);
          });
        });
      }

      // # 1.  pathname이 '/create' 라면;
      // # 1. fs 모듈의 메서드인 readdir() 실행. 같은 위치의 data 폴더 안에 있는 파일들의 제목을 읽음;
      // # 1. 변수선언. title = 'Welcome - create'
      // # 1. 변수선언. html = template.HTML() 함수실행 (method에서 get과 post방식의 차이점 숙지 중요**);
    } else if (pathname === '/create'){
      fs.readdir('./data', function(error, filelist){
        var title = 'Welcome - create';
        var list = template.list(filelist);
        var html = template.HTML(title, list, `
          <form action="/create_process" method="post">
          <p>
            <input type="text" name="title" placeholder="title">
          </p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `, '');
        // # 2. 헤더 정보에 상태코드 200으로 응답;
        // # 2. 변수 template 출력;
        response.writeHead(200);
        response.end(html);
      });

      // # 1. pathname이 '/create_process'라면;
      // # 1. 변수선언. body ='' (String 형식);
      // # 1. data를 받아옴;
      // # 1. body에 받아온 data 내용을 추가;
      // # 1. data 전송 종료;
      // # 1. 변수선언. post = body 내용을 객체화시킴;
      // # 1. 변수선언. title = post방식으로 전송된 data의 제목;
      // # 1. 변수선언. description = post방식으로 전송된 data의 내용;
      // # 1. data 폴더에 받아온 data 내용을 저장하기 위해 fs모듈의 메서드인 writeFile('대상 파일, 내용, 옵션, 콜백함수') 메서드 사용;
    } else if (pathname === '/create_process') {
      var body = '';
      request.on('data', function(data){
        body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){
          // # 1. 헤더 정보에 상태코드 302로 응답; 사용자가 submit 클릭 후 그 페이지를 볼 수 있도록 리다이렉션시킴;
          // # 1. 화면 출력;
          response.writeHead(302, {Location: `/?id=${title}`});
          response.end();
        })
      });

      // # 1. pathname이 '/update'라면;
      // # 1. fs 모듈의 메서드인 readdir() 실행. 같은 위치의 data 폴더 안에 있는 파일들의 제목을 읽음;
      // # 1. fs 모듈의 메서드인 readFile() 실행. readFile(읽고자 하는 파일 이름, 읽을 때 옵션, 파일이 읽혀진 후 호출될 함수);
      // # 1. 변수선언. title = queryData 객체의 id값;
      // # 1. 변수선언. list = templateList() 함수실행;
      // # 1. 변수선언. html = template.HTML() 함수실행;
      // # 1. template.HTML() 함수의 'body' 요소;
      // # 1. template.HTML() 함수의 'control' 요소; ** name=id로 hidden 속성의 텍스트상자를 따로 만든 이유 :
      // 사용자가 제목을 변경했을 때, 그것을 data폴더 안에서 찾을 수 없으므로, data 폴더 안의 수정하고자 하는 파일의 제목과 같은 id값이 들어있는 텍스트상자가 필요함;
    } else if (pathname === '/update'){
      fs.readdir('./data', function(error, filelist){
        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
          var title = queryData.id;
          var list = template.list(filelist);
          var html = template.HTML(title, list,
            `
            <form action="/update_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <p>
              <input type="text" name="title" placeholder="title" value="${title}">
            </p>
            <p>
              <textarea name="description" placeholder="description">${description}</textarea>
            </p>
            <p>
              <input type="submit">
            </p>
            </form>
            `,
            `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
          );
          // # 1. 헤더 정보에 상태코드 200으로 응답;
          // # 1. 변수 html 출력;
          response.writeHead(200);
          response.end(html);
        });
      });

      // # 1. pathname이 '/update_process'라면;
      // # 1. 변수선언. body = 비어있는 변수 body를 만들어주기 위해서 공백처리, 사용자가 요청할때 들어오는 데이터를 저장해서 이용하기 위한 저장공간을 마련;
      // # 1. data를 받아옴;
      // # 1. body에 받아온 data 내용을 추가;
      // # 1. data 전송 종료;
      // # 1. 변수선언. post = body 내용을 객체화시킴;
      // # 1. 변수선언. id = post 객체의 id 값;
      // # 1. 변수선언. title = post방식으로 전송된 data의 제목;
      // # 1. 변수선언. description = post방식으로 전송된 data의 내용;
      // # 1. 사용자가 수정하여 제출한 제목, 내용을 반영하기 위해 fs모듈의 메서드인 rename(`기존 파일 이름`,`변경할 파일 이름`, `콜백함수`) 사용;
      // # 1. data 폴더에 받아온 data 내용을 저장하기 위해 fs모듈의 메서드인 writeFile('대상 파일, 내용, 옵션, 콜백함수') 메서드 사용;
    } else if(pathname === '/update_process'){
      var body = '';
      request.on('data', function(data){
        body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var title = post.title;
        var description = post.description;
        fs.rename(`data/${id}`, `data/${title}`, function(error) {
          fs.writeFile(`data/${title}`, description, 'utf8', function(err){
            // # 1. 헤더 정보에 상태코드 302로 응답; 사용자가 submit 클릭 후 그 페이지를 볼 수 있도록 리다이렉션시킴;
            // # 1. 화면 출력;
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end();
          });
        });
      });
      // # 1. pathname이 '/delete_process'라면;
      // # 1. 변수선언. body = 비어있는 변수 body를 만들어주기 위해서 공백처리, 사용자가 요청할때 들어오는 데이터를 저장해서 이용하기 위한 저장공간을 마련;
      // # 1. data를 받아옴;
      // # 1. body에 받아온 data 내용을 추가;
      // # 1. data 전송 종료;
      // # 1. 변수선언. post = body 내용을 객체화시킴;
      // # 1. 변수선언. id = post 객체의 id 값;
      // # 1. fs 모듈의 메서드인 fs.unlink(`삭제할 파일의 경로`, `콜백함수`) 사용;
      // # 1. data 폴더에 받아온 data 내용을 저장하기 위해 fs모듈의 메서드인 writeFile('대상 파일, 내용, 옵션, 콜백함수') 메서드 사용;
    } else if(pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){
        body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        fs.unlink(`data/${id}`, function(error) {
          // # 1. 헤더 정보에 상태코드 302로 응답; 사용자가 delete 클릭 후 홈으로 가도록 리다이렉션시킴;
          // # 1. 화면 출력;
          response.writeHead(302, {Location: `/`});
          response.end();
        })
      });
      // # 1. #1번 가정의 모든 경우가 아니라면;
      // # 1. 헤더 정보에 상태코드 404로 응답;
      // # 1. 화면에 'Not found' 출력;
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
//port 3000으로 서버를 실행;
app.listen(3000);
