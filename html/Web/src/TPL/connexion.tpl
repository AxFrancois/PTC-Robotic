<link rel="stylesheet" href="/var/www/html/page.css">
<main>
    <script defer src="/var/www/html/JS/client/app.js"></script>
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
</main>
