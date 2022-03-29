<?php
/* Smarty version 3.1.39, created on 2022-03-29 13:59:04
  from '/var/www/html/TPL/connexion.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.39',
  'unifunc' => 'content_6242f488a956d0_46726175',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '18fb5d08b5bf55ac6af48501398070db01c7bb79' => 
    array (
      0 => '/var/www/html/TPL/connexion.tpl',
      1 => 1648555142,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_6242f488a956d0_46726175 (Smarty_Internal_Template $_smarty_tpl) {
?><link rel="stylesheet" href="/CSS/page.css">
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

    <?php echo '<script'; ?>
 src="https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.3.5/bluebird.min.js"><?php echo '</script'; ?>
>
    <?php echo '<script'; ?>
 src="https://code.jquery.com/jquery-3.2.1.slim.min.js"><?php echo '</script'; ?>
>

    <!--IMPORTANT: BE SURE YOU HONOR THIS JS LOAD ORDER-->
    <?php echo '<script'; ?>
 src="zip-full.min.js"><?php echo '</script'; ?>
>
    <?php echo '<script'; ?>
 src="JSPrintManager.js"><?php echo '</script'; ?>
>
    <?php echo '<script'; ?>
 src="connexionRadio.js"><?php echo '</script'; ?>
>
</main><?php }
}
