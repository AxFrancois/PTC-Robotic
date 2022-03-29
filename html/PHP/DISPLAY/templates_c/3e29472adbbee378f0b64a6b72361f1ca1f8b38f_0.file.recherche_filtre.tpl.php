<?php
/* Smarty version 3.1.39, created on 2022-02-11 09:55:16
  from '/var/www/html/TPL/recherche_filtre.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.39',
  'unifunc' => 'content_620624741faf03_26913941',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '3e29472adbbee378f0b64a6b72361f1ca1f8b38f' => 
    array (
      0 => '/var/www/html/TPL/recherche_filtre.tpl',
      1 => 1644569693,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_620624741faf03_26913941 (Smarty_Internal_Template $_smarty_tpl) {
?><ul>
    <li>
    <label for="meridien">Méridien</label>
    <select name="filtre_meridien" data-mdb-placeholder="M" data-mdb-clear-button="true">
        <option disabled selected value=null> -- selectionner un méridien -- </option>
        <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['data_meridien']->value, 'meridien');
$_smarty_tpl->tpl_vars['meridien']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['meridien']->value) {
$_smarty_tpl->tpl_vars['meridien']->do_else = false;
?>  
        <option value=<?php echo $_smarty_tpl->tpl_vars['meridien']->value['code'];?>
><?php echo $_smarty_tpl->tpl_vars['meridien']->value['nom'];?>
</option>
        <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
    </select>
    </li>
    <li>
    <label for="pathologie">Type de pathologie</label>
    <select name="filtre_type_patho" data-mdb-placeholder="M" data-mdb-clear-button="true">
    <option disabled selected value=null> -- selectionner un type de pathologie -- </option>
        <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['types_patho']->value, 'type_patho');
$_smarty_tpl->tpl_vars['type_patho']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['type_patho']->value) {
$_smarty_tpl->tpl_vars['type_patho']->do_else = false;
?>  
        <option value=<?php echo $_smarty_tpl->tpl_vars['type_patho']->value->code;?>
><?php echo $_smarty_tpl->tpl_vars['type_patho']->value->type;?>
</option>
        <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
    </select>
    </li>
    <li>
    <label for="carac">Caractéristiques</label>
    <select name="filtre_carac" data-mdb-placeholder="M" data-mdb-clear-button="true">
        <option disabled selected value=null> -- selectionner une caractéristique -- </option>
        <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['data_caracs']->value, 'carac');
$_smarty_tpl->tpl_vars['carac']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['carac']->value) {
$_smarty_tpl->tpl_vars['carac']->do_else = false;
?>  
        <option value=<?php echo $_smarty_tpl->tpl_vars['carac']->value->code;?>
><?php echo $_smarty_tpl->tpl_vars['carac']->value->carac;?>
</option>
        <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
    </select>
    </li>
</ul><?php }
}
