<?php

require_once("connect.php");

// Get most recent temp value for indoor temp
$sql = "SELECT `temp_val`,`timestamp` FROM `indoor_temp` ORDER BY `timestamp`;";

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
