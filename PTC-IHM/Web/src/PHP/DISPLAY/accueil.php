<?php

    require_once('/usr/local/lib/smarty3/Smarty.class.php');
    require_once('../connexionDb.php');
    
    $smarty = new Smarty();

    $smarty->assign('title', 'IHM - Robot');
    $smarty->assign('page', './accueil.tpl');
    $smarty->display('../../TPL/main_structure.tpl');
?>
