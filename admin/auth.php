<?php

if(!isset($_POST['username']) && !isset($_POST['password'])) {
//if no values are passed from login form, return to previous page (login)
header("Location: ../index.php?e=1");
}

require_once("connect.php");

echo $username = mysqli_real_escape_string($mysqli, $_POST["username"]);
//convert plain password to a hash
echo "<br>";
echo $_POST["password"];
echo "<br>";
echo $password = mysqli_real_escape_string($mysqli,hash("SHA256",$_POST["password"]));

$stmt = $mysqli->prepare("SELECT * FROM `users` WHERE username = ? AND password = ?");
// Put parameter into query
$stmt->bind_param("ss", $username, $password);
// Run the statement
$stmt->execute();
// Set result to this query
$result = $stmt->get_result();
if ($result->num_rows === 1) {
    while ($row = $result->fetch_assoc()) {
        // let us log in
        session_start();
        $_SESSION["auth"] = "auth";
        $_SESSION["name"] = $row["name"];
        header("Location: index.php");
        die("Log in successful");
    }
}else {
    // if 1 is not returned, redirect to login page with e=2
    header("Location: ../index.php?e=2");
    die("Wrong information");
}