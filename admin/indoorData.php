<?php

require_once("connect.php");

// Get fetch parameter 
$order = file_get_contents('php://input');

// Get most recent temp value for indoor temp
$sql = "SELECT `temp_val`,`timestamp` FROM `indoor_temp` ORDER BY `timestamp` $order;";

$result = $mysqli->query($sql);

if($result->num_rows) {
    while($row = $result->fetch_assoc()){
        $json[] = $row;
   }
   
   echo json_encode($json);
}
else {
    die ("No results found");
}
