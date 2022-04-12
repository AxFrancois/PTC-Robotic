<?php
    $host='localhost';
    $dbname='robot';
    $user='robotcpe';
    $password='robotcpe';
    try {
        $db = new PDO('pgsql:host='.$host.';dbname='.$dbname.';user='.$user.';password='.$password);
    } catch (PDOException $e) {
        print("Erreur !: " . $e->getMessage() . "<br/>");
        die();
    }
?>
