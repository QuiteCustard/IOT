<?php
// Get most recent temp value for indoor temp
$sql = "SELECT `temp_val`,`timestamp` FROM `indoor_temp` ORDER BY `timestamp` DESC LIMIT 1;";

$result = $mysqli->query($sql);

if($result->num_rows) {
    while ($row = $result->fetch_assoc()) {
        $last_update = $row['timestamp'];
        $val =  $row['temp_val'];
    }
}
else {
    echo "No results found";
}

// Get most recent temp value for outdoor temp
$sql = "SELECT `temp_val`,`timestamp` FROM `outdoor_temp` ORDER BY `timestamp` DESC LIMIT 1;";

$result = $mysqli->query($sql);

if($result->num_rows) {
    while ($row = $result->fetch_assoc()) {
        $last_update_outdoor = $row['timestamp'];
        $val_outdoor =  $row['temp_val'];
    }
}
else {
    echo "No results found";
}
