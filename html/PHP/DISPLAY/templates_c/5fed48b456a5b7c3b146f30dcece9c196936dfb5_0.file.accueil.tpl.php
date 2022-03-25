<?php
/* Smarty version 3.1.39, created on 2022-03-03 16:31:55
  from '/var/www/html/TPL/accueil.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.39',
  'unifunc' => 'content_6220df6b154876_40056294',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '5fed48b456a5b7c3b146f30dcece9c196936dfb5' => 
    array (
      0 => '/var/www/html/TPL/accueil.tpl',
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
function content_6220df6b154876_40056294 (Smarty_Internal_Template $_smarty_tpl) {
?><main>
    <div class="main_index">
        <section class="mainPart">
            <ul class="ul_accueil">
                <li>
                    <h1>Et la bienvenueeee</h1>
                </li>
                <li>
                    <p>Salut ceci est la section 1 (1.5.x Louis)</p>
                </li>
                <li>
                    <a href="/PHP/DISPLAY/recherche.php" class="link_recherche">
                        <span>
                            Lancer une recherche
                        </span>
                    </a>
                </li>
            </ul>
        </section>
        <?php if ($_smarty_tpl->tpl_vars['connect']->value) {?>
            <?php $_smarty_tpl->_subTemplateRender('file:./accueil_compte.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
        <?php } else { ?>
            <?php $_smarty_tpl->_subTemplateRender('file:./connexion.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
        <?php }?>
    </div>
</main><?php }
}
