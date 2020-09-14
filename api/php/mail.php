<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require_once('PHPMailer-6.0.5/src/Exception.php');
    require_once('PHPMailer-6.0.5/src/PHPMailer.php');
    require_once('PHPMailer-6.0.5/src/SMTP.php');
    require_once('getEmailTexts.php');
    require_once('getSettings.php');

    function setupPHPmailer() {
        $mailer = new PHPMailer; //(true);
        $mailer->SMTPDebug = 3;           
        //$mailer->isSMTP();
        //Enable SMTP debugging.
        //Set this to true if SMTP host requires authentication to send email
        $mailer->Encoding = 'base64';
        $mailer->CharSet="UTF-8";
        $mailer->SetFrom(getSettings()->senderEmail, getSettings()->senderName);
        // Adding Recipients
        return $mailer;
    }

    function sendInfoMail($mailInfo, $mailer) {
        $response = new stdClass();
        $response->message = 'Some unknown error occurred in sendInfoMail';
        $response->success = false;
        try {
            $i = 0;
            foreach($mailInfo->recipients as $recipient) {
                if($i > 0) {
                    $mailer->AddCC($recipient->mail, $recipient->name);
                }else if( $i === 0){
                    // Main Address is set as Adress. The others as CC
                    $mailer->AddAddress($recipient->mail, $recipient->name);
                }
                $i++;
            }
            //echo json_encode( $mail->getAllRecipientAddresses() );

            //Content
            
            // Generating data object for email
            //
            $mailer->Subject = "Anmeldung Bergundsport";
            $mailer->Body    = generateSignInInfoMailText($mailInfo->customerData);
            $mailer->IsHTML(true);

            $mailer->send(true);
            $response->message = 'Info mail has been sent';
            $response->success = true;
        } catch (Exception $e) {
            $response->message = 'Info mail could not be sent. Mailer Error: '.$mail->ErrorInfo;;
            $response->success = false;
        }

        return $response;
    }

    function sendCustomerMail($mailInfo, $mailer) {
        $response = new stdClass();
        $response->message = 'Some unknown error occurred in sendCustomerMail';
        $response->success = false;
        try {
            $name = $mailInfo->customerData->firstName." ".$mailInfo->customerData->lastName;
            $mailer->AddAddress($mailInfo->customerData->email, $name);
            //echo json_encode( $mail->getAllRecipientAddresses() );

            //Content
            
            // Generating data object for email
            //
            $mailer->Subject = "Anmeldung Bergundsport";
            $mailer->Body    = generateCustomerMailText($mailInfo->customerData);
            $mailer->IsHTML(true);

            $mailer->send(true);
            $response->message = 'Customer mail has been sent';
            $response->success = true;
        } catch (Exception $e) {
            $response->message = 'Customer mail could not be sent. Mailer Error: '.$mail->ErrorInfo;;
            $response->success = false;
        }

        return $response;
    }
    function sendMail($mailInfo) {
        $response = new stdClass();
        $response->message = 'Some unknown error occured while trying to send both mails.';
        $response->success = false;
        $mailer;
        try {
            $mailer = setupPHPmailer();
        } catch (Exception $e) {
            $response->message = 'Could not setup PHPMailer. Mailer Error: '.$mail->ErrorInfo;
            $response->success = false;
            return $response;
        }
        $infoMailResponse = sendInfoMail($mailInfo, $mailer);
        if( $infoMailResponse->success ) {
            $customerMailResponse = sendCustomerMail($mailInfo, $mailer);
            if( !$customerMailResponse->success ) {  
                $response = $customerMailResponse;
                return $response;
            }
        } else {
            $response = $infoMailResponse;
            return $response;
        }

        $response->message = 'All emails sent.';
        $response->success = true;
        return $response;
    }


?>
