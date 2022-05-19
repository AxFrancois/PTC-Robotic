/*
* Code sources : 
*   - https://www.bhuvaneswaran.com/serial-port-communication-with-node/
*   - https://github.com/fireship-io/socketio-minimal-demo
* 
* Cherry-picking by Axel
*/

const http = require('http').createServer();

const io = require('socket.io')(http, {
	cors: { origin: "*" }
});

var SerialPort = require("serialport");
var port = "/dev/ttyUSB0";
//var message = "gauche";
var initMessage = 'Connection succesfully established with communication program';

var serialPort = new SerialPort(port, {
	baudRate: 19200
});


io.on('connection', (socket) => {
	console.log(initMessage);
	io.emit('message', `${initMessage}`);

	//Send
	socket.on('message', (message) => {
		
		while (message.length < 8) {	//20 = taille maximale d'un message d'après la documentation
			message += ' ';
		}
		
		console.log(`IHM : ${message}`);
		serialPort.write(message, function (err) {
			if (err) {
				io.emit('message', `Communication error with serial port : ${err.message}`);
				console.log("SP write error: ", err.message);
				return
			}
			io.emit('message', `>> ${message}`);
			console.log("SP send");
			//attendre un message d'ack du robot
		});
	});

	//Receive
	serialPort.on("data", function (data) {
		console.log("SP receive");
		io.emit('message', `Robot > ${data}`);
		//attendre un message d'ack de l'ihm (ou pas ?)
	});
});


http.listen(8080, () => console.log('listening on http://localhost:8080'));
