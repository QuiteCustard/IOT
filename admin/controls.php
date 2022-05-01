<?php
require_once("connect.php");

// Get all equip status'
$sql = "SELECT * FROM `status`";

$result = $mysqli->query($sql);

if($result->num_rows) {
    while ($row = $result->fetch_assoc()) {
        $json = $row;
    }
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($json);
}
else {
    die ("No results found");
}
