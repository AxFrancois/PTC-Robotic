<?php
    
    $host='postgresql';
    $dbname='postgres_db';
    $user='admin';
    $password='secret';
    $port='5432';
    //require_once 'config.php';

    do {
        try {
            $dsn = "pgsql:host=$host;port=$port;dbname=$dbname;";
            // make a database connection
            $db = new PDO($dsn, $user, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

            if ($db) {
                // console.log("Connected to the $dbname database successfully!");
            }
        } catch (PDOException $e) {
            //echo($e->getMessage());
            continue;
        }

        break;

    } while (!$db);

?>
