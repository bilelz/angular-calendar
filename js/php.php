<?php
header('Content-type: text/json; charset=utf-8');
session_unset();
session_start();

if (isset($_COOKIE['cookiemail'])) {
		$canSend = false;	
		response("ko", 'cant send! cookie too young!');
}else{		
	setcookie("cookiemail", "truc", time()+1);  /* expire dans x seconds */
}

//phpinfo();

function response($status ="ko", $response =""){
	echo '{
		"status" : "'.$status.'",
		"response" : "'.$response.'"
	}';
	exit();
}


function testArg($arg){
	if(!isset($_GET[$arg])){
		response("ko","no ".$arg);
	}
}
$email_to = "bilelz+caldevadd@gmail.com";


testArg("title");
testArg("date");
testArg("dateend");
testArg("adress");
testArg("description");
testArg("mail");

$title = $_GET['title'];
$date = $_GET['date'];
$dateend = $_GET['dateend'];
$description = stripslashes($_GET['description']);
$adress = $_GET['adress'];


$email_message = $_GET['title'].'<br/>'.$_GET['date'].' > '.$_GET['dateend'].'<br/>'
				.$_GET['adress'].'<br/>'.$_GET['description'].'<br/>'.$_GET['mail'];

$bundary = md5(uniqid(mt_rand()));

$body = "--$bundary
Content-Type: text/plain; charset=UTF-8
Content-Transfer-Encoding: quoted-printable

$email_message

--$bundary
Content-Type: text/html; charset=UTF-8
Content-Transfer-Encoding: quoted-printable

$email_message

--$bundary
Content-Type: text/calendar; charset=UTF-8; method=REQUEST
Content-Transfer-Encoding: quoted-printable

BEGIN:VCALENDAR
PRODID:-//Google Inc//Google Calendar 70.9054//EN
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
DTSTART:$date
DTEND:$dateend
DTSTAMP:$date
UID:bilelz+islamagenda@gmail.com
ATTENDEE;CUTYPE=3DINDIVIDUAL;ROLE=3DREQ-PARTICIPANT;PARTSTAT=3DACCEPTED;RSV=
P=3DTRUE
 ;CN=3Dcaldev.io;X-NUM-GUESTS=3D0:mailto:bilelz+caldev@gmail.com
CREATED:$date
DESCRIPTION:$description
LAST-MODIFIED:$date
LOCATION:$adress
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:$title
TRANSP:OPAQUE
END:VEVENT
END:VCALENDAR

--$bundary--
";

$email_subject = "=?UTF-8?B?".base64_encode($_GET['title']).'?=';

$email_from = $_GET['mail'];
$email_subject = "[ADD EVENT] ".$_GET['title'];


$headers = 'MIME-Version: 1.0' . "\r\n" . "Content-Type: multipart/alternative; boundary=$bundary; charset=UTF-8" . "\r\n";
$headers .= "From: $email_from\r\n";
if(isset($_GET['mailcc'])==1){
	$headers .= "Bcc: $email_from\r\n";
}
$headers .= "Reply-To: $email_from\r\n";
$headers .= "\r\n";

//echo 'body'.$body;
//echo 'header'.$headers;

if (mail($email_to,$email_subject,$body,$headers)){
	response("ok","Demande d'ajout envoyée!");
}else{
	response("ko","Le message n'a pu être envoyée.<br/> Nos équipes sont avertis. Veuillez essayer ultérieurement.") ;
}

response("ko", "nothing?");





?>