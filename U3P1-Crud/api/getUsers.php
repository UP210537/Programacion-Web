<?php
include "./partials/Connection.php";

try {
    $sql = "SELECT * FROM `user`;";
    $state = $conn->query($sql);
    $json = [];
    while ($row = $state->fetch(PDO::FETCH_ASSOC)) {
        $json[] = [
            'id' => $row['id'],
            'fullname' => "{$row['firstname']} {$row['lastname']}"
        ];
    };

    $jsonString = json_encode($json);
    echo $jsonString;
} catch (PDOException $e) {
    die($e->getMessage());
}