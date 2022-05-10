<?php

    require_once('../../connexionDb.php');

    $nomArticle = $_GET['NomArticle'];
    $rayonArticle = $_GET['RayonArticle'];
    $codeArticle = hash('crc32', $nomArticle.''.$rayonArticle);

    $query = "SELECT *
                FROM ARTICLE a
                WHERE a.code = '$codeArticle'";

    $res=$db->prepare($query);
    $res->execute();

    $Article = $res->fetchAll(PDO::FETCH_ASSOC);

?>