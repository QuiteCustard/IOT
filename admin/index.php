<?php
require_once("loginCheck.php");

if(!(isset($auth))) {
    header("Location:../index.php?e=3");
    die("Not logged in");
}

require_once("../includes/head.php"); 
?>
<body>
       hi
</body>
</html>
