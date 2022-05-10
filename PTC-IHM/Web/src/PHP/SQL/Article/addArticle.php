<?php

    require_once('../../connexionDb.php');

    require_once('./findArticle.php');
    if (empty($Article)) {
        $nomArticle = $_GET['NomArticle'];
        $rayonArticle = $_GET['RayonArticle'];
        $codeArticle = hash('crc32', $nomArticle.''.$rayonArticle);

        $query = "INSERT INTO ARTICLE (ID_ARTICLE, NOM, CODE, RAYON) VALUES
                    (Nextval('ARTICLE_SEQ'), '$nomArticle', '$codeArticle', $rayonArticle)";
    
        $res=$db->prepare($query);
        $res->execute();
    }
    header("Location: /PHP/DISPLAY/configuration.php");
    exit();

?>