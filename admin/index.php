<?php
require_once("loginCheck.php");
    if(!(isset($auth))) {
        header("Location:../index.php?e=3");
        die("Not logged in");
    }
?>

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
       
    </body>
</html>
