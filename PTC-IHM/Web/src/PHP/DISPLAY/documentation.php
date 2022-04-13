<?php
    require_once('/usr/local/lib/smarty3/Smarty.class.php');
    
    $smarty = new Smarty();

    $smarty->assign('title', 'Robot - Documentation');
    $smarty->assign('page', './documentation.tpl');
    $smarty->display('../../TPL/main_structure.tpl');
?>

