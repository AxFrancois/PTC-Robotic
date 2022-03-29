<?php
/* Smarty version 3.1.39, created on 2022-03-29 17:33:35
  from '/var/www/html/TPL/header.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.39',
  'unifunc' => 'content_624326cf9ffa92_32748277',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '11fc0993cdcd0e82a46a49e014e480dae07c9b6c' => 
    array (
      0 => '/var/www/html/TPL/header.tpl',
      1 => 1648558097,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_624326cf9ffa92_32748277 (Smarty_Internal_Template $_smarty_tpl) {
?><link rel="stylesheet" href="/CSS/header.css">
<header>
    <div class="titre">
        <h1 class="h1Header">Robot</br></h1>
        <p class="pHeader">Projet de Tronc Commun - 4 ETI</p>
    </div>
    <nav class="navbar">
        <ul>
            <li>
                <a href="/PHP/DISPLAY/accueil.php">
                    Accueil
                </a>
            </li>
            <li>
                <a href="#">
                    Debug
                </a>
            </li>
            <li>
                <a href="#">
                    Commandes
                </a>
            </li>
            <li>
                <a href="/PHP/DISPLAY/connexion.php">
                    Connexion
                </a>
            </li>
        </ul>
    </nav>
</header><?php }
}
