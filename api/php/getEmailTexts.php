<?php 

require_once("getSettings.php");
function generateCustomerMailText($data){
    $src = "www.bergundsport.ch/new/menu/programm/".$data->eventId."/";
    $mailText = "";//"<img src='http://broggoli.ch/header_image.68860903ebaf27fdafe2.png'/>";
    $mailText = $mailText."<p style='font-size:0.6em'>Dies ist eine automatisch generierte E-Mail.</p><br/>";

    $mailText = $mailText."<h1>Vielen Dank f&uumlr deine Anmeldung ".$data->firstName."!</h1>";

    $mailText = $mailText."<p>Die n&oumltigen Infos finden sie <a href='".$src."'>hier</a> auf der Webseite </p>";

    $mailText = $mailText."<p style='font-size:1.2em'>Ihre Angaben:</p><br/>";

    $mailText = $mailText."<p style='font-size:1.3em'>Addresse:</p><br/>";

    $mailText = $mailText."<p>Name: ".$data->firstName." ".$data->lastName."</p>";
    $mailText = $mailText."<p>Addresse: ".$data->address."</p>";
    $mailText = $mailText."<p>PLZ: ".$data->PLZ."</p>";
    $mailText = $mailText."<p>Ort: ".$data->place."</p>";

    
    $mailText = $mailText."<p style='font-size:1.3em'>Kontakt:</p><br/>";

    $mailText = $mailText."<p>E-Mail: ".$data->email."</p>";
    $mailText = $mailText."<p>Telefon Nr.: ".$data->tel."</p>";
    $mailText = $mailText."<p>Mobil-Telefon Nr.: ".$data->mobile."</p>";


    $mailText = $mailText."<p style='font-size:1.3em'>Sonstiges:</p><br/>";

    $mailText = $mailText."<p>Mitglied im Alpenclub: ".($data->alpenClubMember == "true" ? "Ja" : "Nein")."</p>";  
    $mailText = $mailText."<p>Vegi: ".($data->vegi == "true" ? "Ja" : "Nein")."</p>";    
    $mailText = $mailText."<p>Anmerkung: <br/>".nl2br($data->bemerkung)."</p>";

    $mailText = $mailText."<br/>";   
    $mailText = $mailText."<p>Freundliche Gr&uuml;sse</p>";
    $mailText = $mailText."<p>".getSettings()->senderName."</p>";
    return $mailText;
}
function generateSignInInfoMailText($data){
    $mailText = "";//"<img src='http://broggoli.ch/header_image.68860903ebaf27fdafe2.png'/>";
    $mailText = $mailText."<p style='font-size:0.6em'>Dies ist eine automatisch generierte E-Mail.</p><br/>";

    $mailText = $mailText."<h1>".$data->firstName." ".$data->lastName." hat sich f&uumlr ".$data->eventTitle." angemeldet. </h1>";

    $mailText = $mailText."<p style='font-size:1.4em'>Dies sind die Angaben der Person:</p>";
    $mailText = $mailText."<br/>";   

    $mailText = $mailText."<p style='font-size:1.3em'>Addresse:</p>";

    $mailText = $mailText."<p>Name: ".$data->firstName." ".$data->lastName."</p>";
    $mailText = $mailText."<p>Addresse: ".$data->address."</p>";
    $mailText = $mailText."<p>PLZ: ".$data->PLZ."</p>";
    $mailText = $mailText."<p>Ort: ".$data->place."</p>";
    $mailText = $mailText."<br/>";   
    
    $mailText = $mailText."<p style='font-size:1.3em'>Kontakt:</p>";

    $mailText = $mailText."<p>E-Mail: ".$data->email."</p>";
    $mailText = $mailText."<p>Telefon Nr.: ".$data->tel."</p>";
    $mailText = $mailText."<p>Mobil-Telefon Nr.: ".$data->mobile."</p>";
    $mailText = $mailText."<br/>";   


    $mailText = $mailText."<p style='font-size:1.3em'>Sonstiges:</p>";

    $mailText = $mailText."<p>Mitglied im Alpenclub: ".($data->alpenClubMember == "true" ? "Ja" : "Nein")."</p>";  
    $mailText = $mailText."<p>Vegi: ".($data->vegi == "true" ? "Ja" : "Nein")."</p>";    
    $mailText = $mailText."<p>Anmerkung: ".nl2br($data->bemerkung)."</p>";   

       
    $mailText = $mailText."<br/>";   
    $mailText = $mailText."<p>Freundliche Gr&uuml;sse</p>";
    $mailText = $mailText."<p>Dein Webserver</p>";
    return $mailText;
}
?>