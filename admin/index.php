<?php
require_once("loginCheck.php");

if(!(isset($auth))) {
    header("Location:../index.php?e=3");
    die("Not logged in");
}

require_once("../includes/head.php"); 

require_once ("connect.php");
?>
<body>
    <header>
        <nav>
            <a href="#controls-section">Controls</a>
            <a href="#current-temps">Current Temps</a>
            <a href="#charts">Charts</a>
            <a href="#">Historical Data</a>
        </nav>
    </header>
    <main>
        <h1>Dashboard</h1>
        <section id="controls-section">
            <h2>Controls</h2>
            <div class="container" id="controls">
                <button class="control" id="ac" data-enabled="0" data-pi="0"><i class="fa-solid fa-fan"></i>Air conditioner</button>
                <button class="control" id="heating" data-enabled="0" data-pi="0"><i class="fa-solid fa-temperature-arrow-up"></i>Heating</button>
                <button class="control" id="window" data-enabled="0" data-pi="0"><i class="fa-solid fa-house"></i>Open windows</button>
            </div>
        </section>
        <section id="current-temps">
            <h2>Temps</h2>
            <div class="container">
            <div class="pi pi-indoor">
                <h3>Indoor PI Temp</h3>
                <p class="name">Location: <span>Sam's room</span></p>
                <div class="temp">
                    <p><span>Current temperature: </span><span class="temp-val"></span>°C</p>
                    <img src="../assets/unknown.webp" height="50" width="50" alt="Icon depicting temperature">
                </div>
                <p class="last-update">Last Update:<span></span></p>
            </div>
            <div class="pi pi-outdoor">
                <h3>Outdoor PI Temp</h3>
                <p class="name">Location: <span>Outside Sam's room</span></p>
                <div class="temp">
                    <p><span>Current temperature: </span><span class="temp-val"></span>°C</p>
                    <img src="../assets/unknown.webp" height="50" width="50" alt="Icon depicting temperature">
                </div>
                <p class="last-update">Last Update:<span></span></p>
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
        <section id="charts">
            <h2>Charts</h2>
            <div class="container">
            <div class="pi pi-indoor">
                <h3>Sam's room</h3>
                <div id="indoor-chart" style="min-height:30vh; width:100%;"></div>
            </div>
            <div class="pi pi-outdoor">
                <h3>Outside Sam's room</h3>
                <div id="outdoor-chart" style="min-height:30vh; width:100%;"></div>
            </div>
            <div class="api">
                <h3>London</h3>
                <div id="api-chart" style="min-height:30vh; width:100%;"></div>
            </div>
        </section>
    </main>
    <footer>
    </footer>
    <div class="alert-container">
        <div class="alert chart-alert hidden">The page may not display correctly unless you refresh the page due to the chart sizes.<a class='confirm-alert'>I understand</a></div>
        <div class='alert pi-alert hidden'>5 mins have passed since the last update from the PI, it may be offline.<a class='confirm-alert'>Confirm</a></div>
    </div>
    <?php require_once("../includes/footer.php"); ?>