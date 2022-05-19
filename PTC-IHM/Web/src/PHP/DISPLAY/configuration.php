<?php
    require_once('/usr/local/lib/smarty3/Smarty.class.php');
    
    $smarty = new Smarty();

    require_once('../SQL/rayons.php');
    $smarty->assign('rayons', $rayons);
    require_once('../SQL/articles.php');
    $smarty->assign('articles', $articles);

    $smarty->assign('title', 'Robot - Debugger');
    $smarty->assign('page', './configuration.tpl');
    $smarty->display('../../TPL/main_structure.tpl');
?>

