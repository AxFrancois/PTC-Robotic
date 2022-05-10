<link rel="stylesheet" href="/CSS/page.css">
<link rel="stylesheet" href="/CSS/debugger.css">
<main>
    <div class="commands_list">
        <h1>Liste des commandes</h1>
        <table>
            {foreach $cmds as $cmd}
                <tr>
                    <td>{$cmd['commande']}</td>
                    <td>{$cmd['description']}</td>
                </tr>
            {/foreach}
        </table>
    </div>
    <div class="terminal">
        <h1>Terminal</h1>
        <div>
            <textarea id="cmdTerminal" readOnly style="background-color:#302a2a;color:#fff;font-family: 'Courier New', Courier, monospace;" ></textarea>
        </div>
        <div>
            <label>
                <strong>Commande</strong>
                <input id="cmdSubmit" placeholder="Saisie de commandes" />
            </label>
            <button id="submit">Envoyer</button>
        </div>
    </div>
</main>

<script defer src="/JS/client/app.js"></script>
