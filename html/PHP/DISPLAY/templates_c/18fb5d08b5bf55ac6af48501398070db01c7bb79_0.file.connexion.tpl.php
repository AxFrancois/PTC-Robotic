<?php
/* Smarty version 3.1.39, created on 2022-04-03 16:29:22
  from '/var/www/html/TPL/connexion.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.39',
  'unifunc' => 'content_6249af42173275_74852058',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '18fb5d08b5bf55ac6af48501398070db01c7bb79' => 
    array (
      0 => '/var/www/html/TPL/connexion.tpl',
      1 => 1648996038,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_6249af42173275_74852058 (Smarty_Internal_Template $_smarty_tpl) {
?><link rel="stylesheet" href="/CSS/page.css">
<main>
    <?php echo '<script'; ?>
 defer src="/JS/client/app.js"><?php echo '</script'; ?>
>
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
</main><?php }
}
