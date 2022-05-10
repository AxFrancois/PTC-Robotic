<?php

    require_once('../../connexionDb.php');

    $label = $_GET['LabelRayon'];
    $QR_val = hash('crc32', $label);

    $query = "INSERT INTO RAYON (ID_RAYON, LABEL, VALEUR) VALUES
	            (Nextval('RAYON_SEQ'), '$label', '$QR_val')";

    $res=$db->prepare($query);
    $res->execute();

    header("Location: /PHP/DISPLAY/configuration.php");
    exit();

?>