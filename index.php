<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="Sam Edwards">
    <title>IOT</title>
</head>
<body>
    <form method="post" action="admin/auth.php">
            <input type="text" name="username" placeholder="Enter username..." required>
            <input type="password" name="password" placeholder="Password" required>
        <button class="button" action="submit">Sign in</button>
    </form>
<?php
    // Get errors
    if (isset($_GET["e"])){
        include_once ("logging.php");
    }
?>
</body>
</html>