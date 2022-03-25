<?php
/* Smarty version 3.1.39, created on 2022-03-03 16:31:30
  from '/var/www/html/TPL/header.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.39',
  'unifunc' => 'content_6220df52c7b0e0_78452878',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '3decd4aa8b5940c794b3100a8c1dda4d9376e35e' => 
    array (
      0 => '/var/www/html/TPL/header.tpl',
      1 => 1646321428,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_6220df52c7b0e0_78452878 (Smarty_Internal_Template $_smarty_tpl) {
?><link rel="stylesheet" href="/CSS/header.css">
<header>
    <nav class="navbar">
        <a href="/PHP/DISPLAY/accueil.php">
            <img src="/MEDIA/img/logo.png" alt="logo" height="60" width="80"/>
        </a>
        <a href="/PHP/DISPLAY/bibliographie.php">
            <img src="/MEDIA/img/book_sans_32.png" alt="logo">
            </a>
        <?php if ($_smarty_tpl->tpl_vars['connect']->value) {?>
            <a href="/PHP/DISPLAY/user.php">
                <img src="/MEDIA/img/verify_account.png" alt="Connexion" height="60" width="60"/>
            </a>
        <?php } else { ?>
            <a href="/PHP/DISPLAY/user.php">
                <img src="/MEDIA/img/identifiant.png" alt="Connexion" height="60" width="60"/>
            </a>
        <?php }?>

    </nav>
</header><?php }
}
