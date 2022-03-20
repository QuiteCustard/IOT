<?php
$time = date("d/m/y H:i");
$ip = $_SERVER["REMOTE_ADDR"];

if(isset($_GET["e"])){
    if($_GET["e"]=="1"){
        $error = "No username or password entered";
    }else if ($_GET["e"]=="2"){
        $error = "Wrong information<br>";
    }else if ($_GET["e"]=="3"){
        $error = "Trying to enter page you don't have permission for / Insecure";
    }else if ($_GET["e"]=="4"){
        $error = "Logged out";
    }
}
$line = $time." IP:".$ip." Error:".$error."\r\n";
echo $line;