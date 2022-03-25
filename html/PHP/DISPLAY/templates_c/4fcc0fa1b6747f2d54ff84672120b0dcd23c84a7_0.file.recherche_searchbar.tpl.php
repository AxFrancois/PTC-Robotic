<?php
/* Smarty version 3.1.39, created on 2022-03-03 17:44:27
  from '/var/www/html/TPL/recherche_searchbar.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.39',
  'unifunc' => 'content_6220f06b674626_51742422',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '4fcc0fa1b6747f2d54ff84672120b0dcd23c84a7' => 
    array (
      0 => '/var/www/html/TPL/recherche_searchbar.tpl',
      1 => 1646325863,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_6220f06b674626_51742422 (Smarty_Internal_Template $_smarty_tpl) {
echo '<script'; ?>
 language="JavaScript" type="text/javascript" src="/js/jquery-1.2.6.min.js"><?php echo '</script'; ?>
>
<?php echo '<script'; ?>
 type="text/javascript" src="/JS/searchbar.js"><?php echo '</script'; ?>
>
<input
    <?php if (!$_smarty_tpl->tpl_vars['connect']->value) {?>
        disabled
    <?php }?>
name="filtre_sympt" class="recherche-textinput" id="search" type="text" placeholder="Recherche par symptome"><?php }
}
