<?php
require_once("loginCheck.php");

if(!(isset($auth))) {
    header("Location:../index.php?e=3");
    die("Not logged in");
}

require_once("../includes/head.php"); 
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
        <section class="current-temps">
            <h2>Temps</h2>
            <div class="container">
            <div class="pi">
                <h3>PI Temp</h3>
                <p class="name">Location: <span>Sam's room</span></p>
                <div class="temp">
                    <p><span>Current temperature: </span><span class="temp-val">20</span>°C</p>
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
            <div class="pi">
                <h3>PI Chart</h3>
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
    <?php require_once("../includes/footer.php"); ?>