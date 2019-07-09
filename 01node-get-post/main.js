var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static("public"));

app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , token');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');//设置方法
  res.header('Access-Control-Max-Age', '1000');// 1000s之内，不需要再发送预请求进行验证了，时间内直接发正式请求
  next()
})

app.get('/index.htm', function (req, res) {
    res.sendFile( __dirname + "/" + "index.htm" );
});

app.get('/process_get', function (req, res) {
   var response = {
       "first_name": 'xu',
       "last_name": 'tongbao'
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

app.post('/POST/submitInfo', function (req, res) {
  console.log('name:' + req.body.name);
  res.send({
  	code: 200,
  	data: {
  		name: req.body.name
  	}
  });
});

var server = app.listen(8889, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
