var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(3080, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(3080, "192.168.56.1");

console.log('Server running at http://127.0.0.1:3080/');