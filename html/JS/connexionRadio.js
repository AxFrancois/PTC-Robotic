var _serialComm = null;
var _dataToSend = '';
var _dataReceived = '';
var _this = this;

//JSPrintManager WebSocket settings
JSPM.JSPrintManager.auto_reconnect = true;
JSPM.JSPrintManager.start();
JSPM.JSPrintManager.WS.onStatusChanged = function () {
    if (jspmWSStatus()) {
        //get serial ports
        JSPM.JSPrintManager.getSerialPorts().then(function (portsList) {
            var options = '';
            for (var i = 0; i < portsList.length; i++) {
                options += '<option>' + portsList[i] + '</option>';
            }
            $('#serialPort').html(options);
        });
    }
};

//Check JSPM WebSocket status
function jspmWSStatus() {
    if (JSPM.JSPrintManager.websocket_status == JSPM.WSStatus.Open)
        return true;
    else if (JSPM.JSPrintManager.websocket_status == JSPM.WSStatus.Closed) {
        console.warn('JSPrintManager (JSPM) is not installed or not running! Download JSPM Client App from https://neodynamic.com/downloads/jspm');
        return false;
    }
    else if (JSPM.JSPrintManager.websocket_status == JSPM.WSStatus.Blocked) {
        alert('JSPM has blocked this website!');
        return false;
    }
}

//Sending data to port
function doSendData() {
    if (!this._serialComm) {
        this._dataReceived += "Serial port is not open!\r\n";
        this.refreshDisplay();
    } else {
        this._dataToSend = $('#txtDataToSend').val();
        if (this._dataToSend.length > 0) {
            this._serialComm.send(this._dataToSend + $('#endLineChars').val().replace('CR', '\r').replace('LF', '\n'));
            this._dataReceived += "> " + this._dataToSend + "\r\n";
            this.refreshDisplay();
        }
    }
}

//Open port
function doOpen() {
    this._serialComm = new JSPM.SerialComm($('#serialPort').val(), parseInt($('#serialPortBaudRate').val()), JSPM.Serial.Parity[$('#serialPortParity').val()], JSPM.Serial.StopBits[$('#serialPortStopBits').val()], JSPM.Serial.DataBits[$('#serialPortDataBits').val()], JSPM.Serial.Handshake[$('#serialPortFlowControl').val()]);

    this._serialComm.onDataReceived = function (data) {
        _this.dataReceived += "< " + data + "\r\n";
        console.log("Data Received:" + data);
        _this.refreshDisplay();
    };

    this._serialComm.onError = function (data, is_critical) {
        _this.dataReceived += "ERROR: " + data + "\r\n";
        console.log("Error: " + data);
        _this.refreshDisplay();
    };

    this._serialComm.onClose = function (data) {
        _this.dataReceived += "COMM CLOSED!" + "\r\n";
        console.log("Closed: " + data);
        _this.refreshDisplay();
    };

    this._serialComm.open().then(_ => {
        _this.dataReceived += "COMM OPEN!" + "\r\n";
        _this.refreshDisplay();
    });
}

//close port
function doClose() {
    if (!this._serialComm && this._serialComm.isOpen !== true) {
        this._dataReceived += "Serial port is not open!\r\n";
        this.refreshDisplay();
    } else
        this._serialComm.close();
}

function refreshDisplay() {
    $('#txtDataReceived').val(this._dataReceived);
}