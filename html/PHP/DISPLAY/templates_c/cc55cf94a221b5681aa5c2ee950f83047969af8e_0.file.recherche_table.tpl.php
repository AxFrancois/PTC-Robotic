<?php
/* Smarty version 3.1.39, created on 2022-02-25 14:40:52
  from '/var/www/html/TPL/recherche_table.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.39',
  'unifunc' => 'content_6218dc64225567_12509868',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'cc55cf94a221b5681aa5c2ee950f83047969af8e' => 
    array (
      0 => '/var/www/html/TPL/recherche_table.tpl',
      1 => 1645796449,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_6218dc64225567_12509868 (Smarty_Internal_Template $_smarty_tpl) {
?><link rel="stylesheet" href="/CSS/recherche_table.css">
<div class="wrap_scroll">
    <table>
        <thead>
            <tr>
                <th>Pathologie</th>
                <th>Détails</th>
            </tr>
        </thead>
        <tbody>
            <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['instances_pathos']->value, 'patho');
$_smarty_tpl->tpl_vars['patho']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['patho']->value) {
$_smarty_tpl->tpl_vars['patho']->do_else = false;
?>
                <tr>
                    <td><?php echo $_smarty_tpl->tpl_vars['patho']->value->getDesc();?>
</td>
                    <td>
                        <a href="details.php?idp=<?php echo $_smarty_tpl->tpl_vars['patho']->value->getIdp();?>
">Détails</a>
                    </td>
                </tr>
            <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
        </tbody>
    </table>
</div><?php }
}
