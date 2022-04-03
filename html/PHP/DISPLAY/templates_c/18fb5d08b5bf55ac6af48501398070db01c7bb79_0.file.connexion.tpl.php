<?php
/* Smarty version 3.1.39, created on 2022-04-03 14:02:15
  from '/var/www/html/TPL/connexion.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.39',
  'unifunc' => 'content_62498cc795cef8_97585987',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '18fb5d08b5bf55ac6af48501398070db01c7bb79' => 
    array (
      0 => '/var/www/html/TPL/connexion.tpl',
      1 => 1648987329,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_62498cc795cef8_97585987 (Smarty_Internal_Template $_smarty_tpl) {
?><link rel="stylesheet" href="/CSS/page.css">
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

    <?php echo '<script'; ?>
 src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity=
        "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" 
        crossorigin="anonymous">
    <?php echo '</script'; ?>
>
    <?php echo '<script'; ?>
 type="module" src="/JS/client/client.js"><?php echo '</script'; ?>
>
</main><?php }
}
