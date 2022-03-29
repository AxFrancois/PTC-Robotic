<?php
/* Smarty version 3.1.39, created on 2022-02-18 10:17:11
  from '/var/www/html/TPL/recherche.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.39',
  'unifunc' => 'content_620f641775f237_96344566',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '512ae182b87557f5b7fbea87d1a13221f42242d3' => 
    array (
      0 => '/var/www/html/TPL/recherche.tpl',
      1 => 1645175785,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:./recherche_searchbar.tpl' => 1,
    'file:./recherche_filtre.tpl' => 1,
    'file:./recherche_table.tpl' => 1,
  ),
),false)) {
function content_620f641775f237_96344566 (Smarty_Internal_Template $_smarty_tpl) {
?><link rel="stylesheet" href="/CSS/recherche.css">
<div class="recherche-page">
<form action="./recherche.php" method="post">
  <?php $_smarty_tpl->_subTemplateRender("file:./recherche_searchbar.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
  <?php $_smarty_tpl->_subTemplateRender("file:./recherche_filtre.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
  <input name="valider" class="recherche-submit" type="submit" value="Valider">
  <input class="recherche-submit" type="submit" value="Réinitialiser">
</form>
<?php $_smarty_tpl->_subTemplateRender("file:./recherche_table.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
</div><?php }
}
