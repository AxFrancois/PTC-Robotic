<?php
    require_once('/usr/local/lib/smarty3/Smarty.class.php');
    
    $smarty = new Smarty();

    $smarty->assign('title', 'Robot - Debugger');
    $smarty->assign('page', './debugger.tpl');
    $smarty->display('../../TPL/main_structure.tpl');
?>

