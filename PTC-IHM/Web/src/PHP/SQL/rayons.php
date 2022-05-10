<?php

    require_once('../connexionDb.php');

    $query = 'SELECT *
            FROM rayon r';

    $res=$db->prepare($query);
    $res->execute();

    $rayons = $res->fetchAll(PDO::FETCH_ASSOC);
?>