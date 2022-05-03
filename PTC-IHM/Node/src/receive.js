var SerialPort = require("serialport");
var port = "/dev/ttyUSB0";

var serialPort = new SerialPort(port, {
	baudRate: 19200
});

serialPort.on("open", function () {
	console.log("-- Connection opened --");
	serialPort.on("data", function (data) {
		console.log("Data received: " + data);
	});
});
