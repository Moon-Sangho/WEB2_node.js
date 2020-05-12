// template 객체 -> 모듈로 변경함, 외부에서 쓸 수 있도록 exports;
// 1. html 본문 함수,
// 2. 글 목록 함수 삽입
//    변수선언. list = '<ul>';
//    변수선언. i=0;
//    i 값이 data 폴더 안 파일들의 length보다 작다면;
//    list = 아래 내용;
//    i 값에 1을 더해가며 while(반복)문의 조건에 부합할 때까지만 반복;
//    변수 list = 기존 list 형식 + </ul>;
module.exports = {
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

// module.exports = template;
