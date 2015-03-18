<?php
header('Content-type: text/calendar; charset=utf-8');
session_unset();
session_start();


function response($status ="KO", $response =""){
	echo '{
		"status" : "'.$status.'",
		"response" : "'.$response.'"
	}';
	exit();
}


function testArg($arg){
	if(!isset($_GET[$arg])){
		response("KO","no ".$arg);
	}
}



testArg("title");
testArg("filename");
testArg("date");
testArg("dateend");
testArg("adress");
testArg("description");

$title = $_GET['title'];
$filename = $_GET['filename'].".ics";
header('Content-Disposition: attachment; filename=' . $filename); 

$date = $_GET['date'];
$dateend = $_GET['dateend'];
$descriptionOriginal = $_GET['description'];
$adress = $_GET['adress'];

error_log(str_replace("=", "%3D", $descriptionOriginal)); 

$breakLine = array("\n", "\r");
$escapeBreakLine   = array("\\n", "");
$breakLineHTML   = array("<br/>", "");

$descriptionOriginal = str_replace("=", "=3D", $descriptionOriginal);

$descriptionHTML = str_replace($breakLine, $breakLineHTML, $descriptionOriginal);
$description = str_replace($breakLine, $escapeBreakLine, $descriptionOriginal);			

echo 
"BEGIN:VCALENDAR
PRODID:-//Google Inc//Google Calendar 70.9054//EN
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
DTSTART:$date
DTEND:$dateend
DTSTAMP:$date
UID:bilelz+caldev@gmail.com
ATTENDEE;CUTYPE=3DINDIVIDUAL;ROLE=3DREQ-PARTICIPANT;PARTSTAT=3DACCEPTED;RSV=
P=3DTRUE
 ;CN=3Dcaldev.io;X-NUM-GUESTS=3D0:mailto:bilelz+caldev@gmail.com
CREATED:$date
DESCRIPTION:$descriptionHTML
LAST-MODIFIED:$date
LOCATION:$adress
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:$title
TRANSP:OPAQUE
END:VEVENT
END:VCALENDAR";
?>