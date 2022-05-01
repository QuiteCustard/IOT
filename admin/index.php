<?php
require_once("loginCheck.php");

if(!(isset($auth))) {
    header("Location:../index.php?e=3");
    die("Not logged in");
}

require_once("../includes/head.php"); 

require_once ("connect.php");


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

if (isset($last_update)) {
    $timezone = new DateTimeZone("Europe/London");
    // Get current time
    $current_time = new DateTime(null, $timezone);
    echo  $current_time = $current_time->getTimestamp();
    echo "<br>";
    // Convert to unix time
    echo $last_update = strtotime($last_update);
    $last_update_outdoor = strtotime($last_update_outdoor);
    echo "<br>";
    // Get time difference
    echo $time_diff = $current_time - $last_update;
    $time_diff_outdoor = $current_time - $last_update_outdoor;
}
?>
<body>
    <header>
        <nav>
            <a href="#">Current Temps</a>
            <a href="#">Charts</a>
            <a href="#">Historical Data</a>
        </nav>
    </header>
    <main>
        <h1>Dashboard</h1>
        <section class="controls">
        <h2>Controls</h2>
        <div class="container">
            <a class="control"><i class="fa-solid fa-air-conditioner"></i></a>
            <a class="control">Hi</a>
            <a class="control">Hi</a>
        </div>
        </section>
        <section class="current-temps">
            <h2>Temps</h2>
            <div class="container">
            <div class="pi pi-indoor">
                <h3>Indoor PI Temp</h3>
                <p class="name">Location: <span>Sam's room</span></p>
                <div class="temp">
                    <p><span>Current temperature: </span><span class="temp-val"><?= $val ?></span>°C</p>
                    <img src="../assets/unknown.webp" height="50" width="50" alt="Icon depicting temperature">
                </div>
            </div>
            <div class="pi pi-outdoor">
                <h3>Outdoor PI Temp</h3>
                <p class="name">Location: <span>Outside Sam's room</span></p>
                <div class="temp">
                    <p><span>Current temperature: </span><span class="temp-val"><?= $val_outdoor ?></span>°C</p>
                    <img src="../assets/unknown.webp" height="50" width="50" alt="Icon depicting temperature">
                </div>
            </div>
            <div class="api">
                <h3>API Temp</h3>
                <p class="name">Location: <span>Sam's room</span></p>
                <div class="temp">
                    <p><span>Current temperature: </span><span class="temp-val">0</span>°C</p>
                    <img src="../assets/unknown.webp" height="50" width="50" alt="Icon depicting temperature">
                </div>
            </div>
        </section>
        <section class="charts">
            <h2>Charts</h2>
            <div class="container">
            <div class="pi pi-indoor">
                <h3>PI Chart</h3>
                <div id="indoor-chart" style="min-height:30vh; width:90%;"></div>
            </div>
            <div class="pi pi-outdoor">
                <h3>Outdoor PI Chart</h3>
                <div id="outdoor-chart" style="min-height:30vh; width:100%;"></div>
            </div>
            <div class="api">
                <h3>API Chart</h3>
            </div>
        </section>
    </main>
    <footer>
        <nav>
            <a href="#">Current Temps</a>
            <a href="#">Charts</a>
            <a href="#">Historical Data</a>
        </nav>
    </footer>
    <div class="alert-container">
        <div class="alert chart-alert hidden">The page may not display correctly unless you refresh the page due to the chart sizes.<a class='confirm-alert'>I understand</a></div>
<?php
    if ($time_diff > 300 || $time_diff_outdoor > 300) {
        echo "<div class='alert pi-alert'>5 mins have passed since the last update from the PI, it may be offline.<a class='confirm-alert'>Confirm</a></div>"; 
    } 
?>
    </div>
    <?php require_once("../includes/footer.php"); ?>