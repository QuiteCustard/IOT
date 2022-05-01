<?php

require_once("connect.php");

// Get json response
$json = file_get_contents('php://input');

// Converts it into a PHP object
$data = json_decode($json);

$ac = $data->ac;
$window = $data->window;
$heating = $data->heating;

// Prepared statement
$stmt = $mysqli->prepare("UPDATE `status` SET `ac` = ?, `window` = ?, `heating` = ?, `timestamp` = CURRENT_TIMESTAMP");
// Put parameters into query
$stmt->bind_param("iii", $ac, $window, $heating);
// Run statement
$stmt->execute();
// Close statement
$stmt->close();