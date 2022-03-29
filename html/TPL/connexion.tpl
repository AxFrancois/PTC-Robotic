<link rel="stylesheet" href="/CSS/page.css">
<main>
    <div style="text-align:center">
        <h1>BIDI Serial Comm from Javascript</h1>
        <hr />
        <div>
            <label>
                Serial Port
                <select id="serialPort"></select>
            </label>
            <label>
                Baud Rate
                <input id="serialPortBaudRate" value="9600" />
            </label>
            <label>
                Data Bits
                <select id="serialPortDataBits">
                    <option value="Eight">8</option>
                    <option value="Seven">7</option>
                    <option value="Six">6</option>
                    <option value="Five">5</option>
                </select>
            </label>
            <label>
                Parity
                <select id="serialPortParity">
                    <option value="None">None</option>
                    <option value="Odd">Odd</option>
                    <option value="Even">Even</option>
                    <option value="Mark">Mark</option>
                    <option value="Space">Space</option>
                </select>
            </label>
            <label>
                Stop bits
                <select id="serialPortStopBits">
                    <option value="One">1</option>
                    <option value="OnePointFive">1.5</option>
                    <option value="Two">2</option>
                </select>
            </label>
            <label>
                Flow control
                <select id="serialPortFlowControl">
                    <option value="None">None</option>
                    <option value="XOnXOff">XOnXOff</option>
                    <option value="RequestToSend">RTS (Request to send)</option>
                    <option value="RequestToSendXOnXOff">RTS XOnXOff</option>
                </select>
            </label>
            <br /><br />
            <button type="button" onclick="doOpen();">
                Open
            </button>
              
            <button type="button" onclick="doClose();">
                Close
            </button>
        </div>
        <br /><br />
        <div>
            <label>
                <strong>Data to Send</strong>
                <input id="txtDataToSend" value="type here..." />
            </label>
            <select name="endLineChars">
	            <option value="">None</option>
	            <option value="CR">CR</option>
	            <option value="LF">LF</option>
	            <option value="CRLF">CRLF</option>
            </select>
            <button onclick="doSendData();">Send...</button>
        </div>
        <hr />
        <div>
            <textarea id="txtDataReceived" readOnly style="background-color:#302a2a;color:#fff;font-family: 'Courier New', Courier, monospace;" cols="100" rows="10"></textarea>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.3.5/bluebird.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>

    <!--IMPORTANT: BE SURE YOU HONOR THIS JS LOAD ORDER-->
    <script src="zip-full.min.js"></script>
    <script src="JSPrintManager.js"></script>
    <script src="connexionRadio.js"></script>
</main>