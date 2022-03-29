<?php
/* Smarty version 3.1.39, created on 2022-02-18 12:08:36
  from '/var/www/html/TPL/user.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.39',
  'unifunc' => 'content_620f7e34192077_52465453',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'cbf49e00d0c670d5a97c320e509c754d531a458a' => 
    array (
      0 => '/var/www/html/TPL/user.tpl',
      1 => 1645182437,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:./accueil_compte.tpl' => 1,
    'file:./connexion.tpl' => 1,
  ),
),false)) {
function content_620f7e34192077_52465453 (Smarty_Internal_Template $_smarty_tpl) {
?><main>
    <div class="main_index">
            <?php if ($_smarty_tpl->tpl_vars['connect']->value) {?>
                <?php $_smarty_tpl->_subTemplateRender('file:./accueil_compte.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
            <?php } else { ?>
                
                <section>
                    <p id="User_Account">Vous n'êtes pas connecté</p>
                </section>
                <?php $_smarty_tpl->_subTemplateRender('file:./connexion.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
            <?php }?>
    </div>
</main><?php }
}
