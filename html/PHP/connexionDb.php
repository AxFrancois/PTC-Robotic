<?php
    $host='localhost';
    $dbname='acudb';
    $user='pgtidal';
    $password='tidal';
    try {
        $db = new PDO('pgsql:host='.$host.';dbname='.$dbname.';user='.$user.';password='.$password);
    } catch (PDOException $e) {
        print("Erreur !: " . $e->getMessage() . "<br/>");
        die();
    }
?>