<?php
    require_once('/usr/local/lib/smarty3/Smarty.class.php');

    // Init page d'accueil
    $smarty = new Smarty();

    $smarty->assign('title', 'IHM - Robot');
    $smarty->assign('page', 'TPL/accueil.tpl');
    $smarty->display('TPL/main_structure.tpl');
?>
