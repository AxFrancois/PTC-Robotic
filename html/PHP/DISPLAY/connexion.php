<?php

    require_once('/usr/share/php/smarty3/Smarty.class.php');
    
    $smarty = new Smarty();

    $smarty->assign('title', 'Robot - Connexion');
    $smarty->assign('page', './connexion.tpl');
    $smarty->display('../../TPL/main_structure.tpl');
?>