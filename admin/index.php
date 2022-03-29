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
        <nav>1</nav>
    </header>
    <main>
        <h1>Title text</h1>
        <section class="pi">
            <div class="card">
                <h2>Pi Temp</h2>
                <div class="name">1</div>
                <div class="temp">1</div>
            </div>
        </section>
        <section class="api">
            <div class="card">
                <h2>API Temp</h2>
                <h3 class="name">Hi hi hi</h3>
                <div class="temp">
                    <h4>No val</h4>
                    <img src="../assets/unknown.webp">
                </div>
            </div>
    </section>
    </main>
    <footer></footer>
<?php require_once("../includes/footer.php"); ?>
