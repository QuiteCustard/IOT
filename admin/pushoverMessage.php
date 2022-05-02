<?php

require_("connect.php");
require_once("functions.php");

if ($val < 0 || $val_outdoor < 0) {
    curl_setopt_array($ch = curl_init(), array(
        CURLOPT_URL => "https://api.pushover.net/1/messages.json",
        CURLOPT_POSTFIELDS => array(
          "token" => "aa43uq6nfzp79sc9razgj49xtcda73",
          "user" => "u8ym6krstqxmzvnxjy2ywsxgt8nafm",
          "message" => "Temp is below 0°C!",
        ),
        CURLOPT_SAFE_UPLOAD => true,
        CURLOPT_RETURNTRANSFER => true,
      ));
      curl_exec($ch);
      curl_close($ch);
      
}
