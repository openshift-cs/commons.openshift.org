<?php
/*$to = "nickharveyonline@gmail.com";
$from = "no-reply@site.com";

$headers = "From: " . $from . "\r\n";

$subject = "New subscription";
$body = "New user subscription: " . $_POST['email'];

mail($to,$from,$subject,$body,$headers)
*/

$to      = 'nickharveyonline@gmail.com';
$subject = 'the subject';
$message = 'hello';
$headers = 'From: nickharveyonline@gmail.com' . "\r\n" .
    'Reply-To: nickharveyonline@gmail.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $message, $headers);

/*if( filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) )
{ 
    if (mail($to, $subject, $body, $headers, "-f " . $from))
    {
        echo 'Your e-mail (' . $_POST['email'] . ') has been added to our mailing list!';
    }
    else
    {
       echo 'There was a problem with your e-mail (' . $_POST['email'] . ')';   
    }
}
else
{
   echo 'There was a problem with your e-mail (' . $_POST['email'] . ')';   
}*/
?>