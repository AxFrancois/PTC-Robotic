<?php
/* Smarty version 3.1.39, created on 2022-02-28 08:52:27
  from '/var/www/html/TPL/details.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.39',
  'unifunc' => 'content_621c7f3b59b811_17516381',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '64108a28b3eddaf0bbb8599af5c8c4deb9b9edbd' => 
    array (
      0 => '/var/www/html/TPL/details.tpl',
      1 => 1646034745,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_621c7f3b59b811_17516381 (Smarty_Internal_Template $_smarty_tpl) {
?><link rel="stylesheet" href="/CSS/details.css">
<div class="recherche-page">
    <h1><?php echo $_smarty_tpl->tpl_vars['patho']->value->getDesc();?>
</h1>
    <table>
        <tbody>
            <tr>
                <td>
                    Symptomes liés :
                </td>
                <td>
                    <ul>
                    <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['patho']->value->getSympts(), 'sympt');
$_smarty_tpl->tpl_vars['sympt']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['sympt']->value) {
$_smarty_tpl->tpl_vars['sympt']->do_else = false;
?>
                        <li>
                            <?php echo $_smarty_tpl->tpl_vars['sympt']->value['desc'];?>

                        </li>
                    <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
                    </ul>
                </td>
            </tr>
            <tr>
                <td>
                    Méridien :
                </td>
                <td>
                    <?php echo $_smarty_tpl->tpl_vars['patho']->value->getMer();?>

                </td>
            </tr>
            <tr>
                <td>
                    Type de pathologie :
                </td>
                <td>
                    <ul>
                    <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['patho']->value->getTypes(), 'type');
$_smarty_tpl->tpl_vars['type']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['type']->value) {
$_smarty_tpl->tpl_vars['type']->do_else = false;
?>
                        <li>
                            <?php echo $_smarty_tpl->tpl_vars['type']->value;?>

                        </li>
                    <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
                    </ul>
                </td>
            </tr>
            <tr>
                <td>
                    Caractéristiques :
                </td>
                <td>
                    <ul>
                    <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['patho']->value->getCaracs(), 'carac');
$_smarty_tpl->tpl_vars['carac']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['carac']->value) {
$_smarty_tpl->tpl_vars['carac']->do_else = false;
?>
                        <li>
                            <?php echo $_smarty_tpl->tpl_vars['carac']->value;?>

                        </li>
                    <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
                    </ul>
                </td>
            </tr>
        </tbody>
    </table>
</div><?php }
}
