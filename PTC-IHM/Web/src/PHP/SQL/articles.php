<?php

    require_once('../connexionDb.php');

    $query = 'SELECT *
            FROM article a';

    $res=$db->prepare($query);
    $res->execute();

    $articles = $res->fetchAll(PDO::FETCH_ASSOC);
?>