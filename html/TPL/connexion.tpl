<link rel="stylesheet" href="/CSS/page.css">
<main>
    <div style="text-align:center">
        <h1>Options de connexion</h1>
        <div>
            <label>
                Serial Port
                <select id="serialPort">
                    <option value="/dev/ttyUSB0">ttyUSB0</option>
                </select>
            </label>
            <label>
                Baud Rate
                <input id="baudRate" value="19200" />
            </label>
            <button>
                Connexion
            </button>
        </div>
        <div>
            <label>
                <strong>Commande</strong>
                <input id="txtCommande" placeholder="Saisie de commandes" />
            </label>
            <button id="submit">Send...</button>
        </div>
        <hr />
        <div>
            <textarea id="txtDataReceived" readOnly style="background-color:#302a2a;color:#fff;font-family: 'Courier New', Courier, monospace;" cols="100" rows="10"></textarea>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity=
        "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" 
        crossorigin="anonymous">
    </script>
    <script type="module" src="/JS/client/client.js"></script>
</main>