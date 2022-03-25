<?php
/* Smarty version 3.1.39, created on 2022-03-03 18:09:56
  from '/var/www/html/TPL/inscription.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.39',
  'unifunc' => 'content_6220f664b240b0_15899237',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'ecfd97df9a136a400ece9d90220c7ef79d96d39c' => 
    array (
      0 => '/var/www/html/TPL/inscription.tpl',
      1 => 1646327388,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_6220f664b240b0_15899237 (Smarty_Internal_Template $_smarty_tpl) {
?><section class="connexionPart">
    <h1>Inscription</h1>
    <form class="bordure_connexion" method="post" action="/PHP/DISPLAY/accueil.php">          <ul class="ul_accueil">
            <li>
                <span>
                    email
                </span>
                <input type="text" placeholder="Ex: nom@exemple.com" name="email_inscription"/>
            </li>
            <li>
                <span>
                    mot de passe
                </span>
                <input type="password" name="mdp"/>
            </li>
            <li>
                <input type="submit">
            </li>
        </ul>
    </form>
</section><?php }
}
