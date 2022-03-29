var SerialPort = require("serialport");
var port = "/dev/ttyUSB0";
var varBaudRate = 19200;

function doOpen() {
  globalThis.port = document.getElementById("serialPort").value;
  globalThis.varBaudRate = document.getElementById("baudRate").value;
}

globalThis.serialPort = new SerialPort(port, {
    baudRate: varBaudRate
  });

function doSendCommand() {
  var message = document.getElementById("txtCommande").value;
  serialPort.write(message, function(err) {
    if (err) {
      document.getElementById('txtDataReceived').value += "Error on write: ", err.message;
    }
    document.getElementById('txtDataReceived').value += ">>", message;
  });
}