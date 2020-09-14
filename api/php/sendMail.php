<?php
require_once('mail.php');
require_once('getSettings.php');
start();
function start(){

    $recipients = getSettings()->mailRecipients;
    $recipients = json_decode(json_encode($recipients));

    $customerData = new stdClass();
    $customerData->firstName = filter_var($_POST["firstName"], FILTER_SANITIZE_STRIPPED);
    $customerData->lastName = filter_var($_POST["lastName"], FILTER_SANITIZE_STRIPPED);
    $customerData->address = filter_var($_POST["address"], FILTER_SANITIZE_STRIPPED);
    $customerData->PLZ = filter_var($_POST["PLZ"], FILTER_SANITIZE_STRIPPED);
    $customerData->place = filter_var($_POST["place"], FILTER_SANITIZE_STRIPPED);
    $customerData->email = filter_var($_POST["email"], FILTER_SANITIZE_STRIPPED);
    $customerData->tel = filter_var($_POST["tel"], FILTER_SANITIZE_STRIPPED);
    $customerData->mobile = filter_var($_POST["mobile"], FILTER_SANITIZE_STRIPPED);
    $customerData->alpenClubMember = filter_var($_POST["alpenClubMember"], FILTER_SANITIZE_STRIPPED);
    $customerData->vegi = filter_var($_POST["vegi"], FILTER_SANITIZE_STRIPPED);
    $customerData->bemerkung = filter_var($_POST["bemerkung"], FILTER_SANITIZE_STRIPPED);
    $customerData->eventTitle = filter_var($_POST["eventTitle"], FILTER_SANITIZE_STRIPPED);
    $customerData->eventId = filter_var($_POST["eventId"], FILTER_SANITIZE_STRIPPED);
    
    $mailInfo = new stdClass();
    $mailInfo->recipients = $recipients;
    $mailInfo->customerData = $customerData;
    //send the mail -> function in mail.php
    $response = new stdClass();
    $sendMail = sendMail($mailInfo);
    if($sendMail->success == true){
        $response = $sendMail;
        echo json_encode($response);
    }else{
        $exceptionString = 'Unable to send mail.';
        $response->message = $exceptionString;
        throw new RuntimeException($exceptionString);
    }

}
 ?>
