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
            <a href="#">Charts</a>
            <a href="#">Historical Data</a>
        </nav>
    </header>
    <main>
        <h1>IOT</h1>
        <section class="current-temps">
        <h2>Temps</h2>
            <div class="pi">
                <h3>PI Temp</h3>
                <p class="name">Location: <span>Sam's room</span></p>
                <div class="temp">
                <p><span>Current temperature: </span><span class="temp-val">0</span>°C</p>
                    <img src="../assets/unknown.webp" height="50" width="50">
                </div>
            </div>
            <div class="api">
                <h3>API Temp</h3>
                <p class="name">Location: <span>Sam's room</span></p>
                <div class="temp">
                    <p><span>Current temperature: </span><span class="temp-val">0</span>°C</p>
                    <img src="../assets/unknown.webp" height="50" width="50">
                </div>
        </section>
    </main>
    <footer></footer>
    <?php require_once("../includes/footer.php"); ?>