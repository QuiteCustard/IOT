<?php
session_start();

if (isset($_SESSION["auth"]))
{
    $auth = $_SESSION["auth"];
}
else
{
header("Location:../index.php?e=3");
die("Not logged in");
}

?>