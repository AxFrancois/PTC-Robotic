<?php

    require_once('../../connexionDb.php');

    $label = $_GET['LabelRayon'];
    $QR_val = hash('crc32', $label);

    $query = "SELECT *
                FROM RAYON r
                WHERE r.valeur = '$QR_val'";

    $res=$db->prepare($query);
    $res->execute();

    $QR = $res->fetchAll(PDO::FETCH_ASSOC);

?>