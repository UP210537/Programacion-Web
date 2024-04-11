<?php

$host = "localhost:3306";
$dbName = "todoApp";
$user = "root";
$password = "ParaLaEscuela";
$protocol = "mysql:host={$host};dbname={$dbName}";
try {
  // Generación de la Conexion a la base de datos
  $conn = new PDO($protocol, $user, $password);
} catch (PDOException $e) {
  die($e->getMessage());
}
