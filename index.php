<?php 
require_once("includes/head.php"); ?>

<body class="login">
    <form method="post" action="admin/auth.php">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" placeholder="Enter username..." required>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter password..." required>
        <button class="button" action="submit">Sign in</button>
    </form>
    <?php
    // Get errors
    if (isset($_GET["e"])){
        include_once ("logging.php");
    }
?>
<?php require_once("/includes/footer.php"); ?>