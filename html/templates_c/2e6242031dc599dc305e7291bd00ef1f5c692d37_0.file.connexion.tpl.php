<?php
/* Smarty version 3.1.39, created on 2022-03-03 16:30:41
  from '/var/www/html/TPL/connexion.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.39',
  'unifunc' => 'content_6220df21aa98e8_46335533',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '2e6242031dc599dc305e7291bd00ef1f5c692d37' => 
    array (
      0 => '/var/www/html/TPL/connexion.tpl',
      1 => 1646321428,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_6220df21aa98e8_46335533 (Smarty_Internal_Template $_smarty_tpl) {
?><section class="connexionPart">
    <h1 class="connexion_inscription">Connexion</h1>
    <form class="bordure_connexion" method="post" action="/PHP/DISPLAY/accueil.php"> 
        <?php if ($_smarty_tpl->tpl_vars['connect_failed']->value) {?>
         <p class = "error"> Adresse email ou mot de passe incorrect</p>
         <?php }?>
        <ul class="ul_accueil">
            <li>
                <span>
                    email
                </span>
                <input type="text" placeholder="Ex: nom@exemple.com" name="email"/>
            </li>
            <li>
                <span>
                    mot de passe
                </span>
                <input type="password" name="mdp"/>
            </li>
            <li>
                <input class = "bouton" type="submit">
            </li>
        </ul>
    </form>
    <h2 class ="connexion_inscription"> Inscrivez-vous </h2>
    <form action="/PHP/DISPLAY/inscription.php">
        
        <button class ="bouton">s'inscrire</button>
    </form>
</section><?php }
}
