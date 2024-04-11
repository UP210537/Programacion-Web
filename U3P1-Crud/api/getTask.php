<?php
include 'Connection.php';

$userId = $_GET['userId'];

try {
    $query = "SELECT * FROM tasks WHERE user_id = :userId";
    $statement = $conn->prepare($query);
    $statement->bindParam(':userId', $userId);
    $statement->execute();

    $tasks = $statement->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($tasks);
} catch (PDOException $e) {
    echo json_encode(array('error' => $e->getMessage()));
}
?>
