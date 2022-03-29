<?php

    require_once('/usr/share/php/smarty3/Smarty.class.php');
    
    $smarty = new Smarty();

    $smarty->assign('title', 'IHM - Robot');
    $smarty->assign('page', './accueil.tpl');
    $smarty->display('../../TPL/main_structure.tpl');
?>