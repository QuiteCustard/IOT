<?php
require_once("connect.php");
require_once("functions.php");

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
    
    $array = ["indoor"=>$time_diff, "outdoor"=>$time_diff_outdoor];
    echo json_encode($array);
}
else {
    die("Pi has no times");
}