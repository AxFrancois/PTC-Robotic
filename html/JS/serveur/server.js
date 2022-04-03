



/*
const express = require("express")
const path = require("path");
  
const app = express();
const port = process.env.PORT || 3000;

// Setting path for public directory 
const static_path = path.join(__dirname, "public");
app.use(express.static(static_path));
app.use(express.urlencoded({ extended: true }));
  
// Handling request 
app.post("/JS/serveur", (req, res) => {
   res.json([{
      name_recieved: req.body.name,
      designation_recieved: req.body.designation
   }])
})
  
// Server Setup
app.listen(port, () => {
   console.log(`server is running at ${port}`);
});







/*




var SerialPort = require('serialport')
var portRadio = "/dev/ttyUSB0";
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
      document.getElementById('txtDataReceived').value += "Erreur : ", err.message;
    }
    document.getElementById('txtDataReceived').value += ">>", message;
  });
}
*/