<?php
require_once("connect.php");

// Get most recent temp value for indoor temp
$sql = "SELECT `timestamp` FROM `indoor_temp` ORDER BY `timestamp` DESC LIMIT 1;";

$result = $mysqli->query($sql);

if($result->num_rows) {
    while ($row = $result->fetch_assoc()) {
        $last_update = $row['timestamp'];
    }
}
else {
    echo "No results found";
}

// Get most recent temp value for outdoor temp
$sql = "SELECT `timestamp` FROM `outdoor_temp` ORDER BY `timestamp` DESC LIMIT 1;";

$result = $mysqli->query($sql);

if($result->num_rows) {
    while ($row = $result->fetch_assoc()) {
        $last_update_outdoor = $row['timestamp'];
    }
}
else {
    echo "No results found";
}

if (isset($last_update) || isset($last_update_outdoor)) {
    date_default_timezone_set('Europe/London');
    // Get current time
    $current_time = new DateTime();
    $current_time = $current_time->getTimestamp();

    // Convert to unix time
    $last_update = strtotime($last_update);
    $last_update_outdoor = strtotime($last_update_outdoor);

    // Get time difference
    $time_diff = $current_time - $last_update;
    $time_diff_outdoor = $current_time - $last_update_outdoor;
    
    $time_differences = ["indoor" => $time_diff, "outdoor" => $time_diff_outdoor];
    echo json_encode($time_differences);
}
else {
    die("Pi has no times");
}