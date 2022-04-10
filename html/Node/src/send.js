var SerialPort = require("serialport");
var port = "/dev/ttyUSB0";
var message = "gauche";

var serialPort = new SerialPort(port, {
  baudRate: 9600
});

serialPort.write(message, function(err) {
  if (err) {
    return console.log("Error on write: ", err.message);
  }
  console.log("Message sent successfully");
});
