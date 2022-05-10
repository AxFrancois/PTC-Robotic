<?php

    require_once('../connexionDb.php');

    $query = 'SELECT c.commande, c.description
            FROM commande c';

    $res=$db->prepare($query);
    $res->execute();

    $cmds = $res->fetchAll(PDO::FETCH_ASSOC);
?>