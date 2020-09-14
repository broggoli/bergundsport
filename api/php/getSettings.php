<?php
  $GLOBALS["logDBPath"]                   = "../db/log_db.json";
  $GLOBALS["settings"]                    = "../db/settings.json";

  function getSettings(){
    //Get the data base as a string
    $settingsStr = file_get_contents($GLOBALS["settings"]);
    if($settingsStr == "" || $settingsStr == "null"){
      $settingsStr = "{}";
    }
    //convert JSON string to object
    $settingsObject =  (object) json_decode($settingsStr, true);

    return $settingsObject;
  }
?>