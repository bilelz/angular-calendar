<?php header("Content-Type: text/xml; charset=UTF-8");
echo '<?xml version="1.0" encoding="utf-8"?>';
?>

<feed xmlns="http://www.w3.org/2005/Atom">

<?php
	$clientKey = "AIzaSyA3dweFJyhbf-mJ3mxXqFCFnKRNb9idvJ8";
	$serverKey = "AIzaSyC7oGgEJaPG2ecxEcHD2klMuyIYKpjHbm4";
	
	//read config
	$packagejson = file_get_contents("http://".$_SERVER['HTTP_HOST']."/package.json");
	$package = json_decode($packagejson, true);
	
	$lang = ($package["lang"]=="en-us")?"":$package["lang"]; // default (english): "", french = _fr-fr
	if($lang !=""){
		$lang = "_".$lang;
	}
	
	
	
	$baseUrl = ($package["homepage"]=="")?"http:/:caldev.io":$package["homepage"];
	$agendaID = ($package["agendaID"]=="")?"u825pd9kqiahvdqljsk29rass4@group.calendar.google.com":$package["agendaID"];
	
	$today =  date('Y-m-d')."T00%3A00%3A00%2B00%3A00";
	
	//$fakedate, example =  2014-12-31
	if (isset($_GET['fakedate'])) {
		$today = $_GET['fakedate']."T00%3A00%3A00%2B00%3A00";
	}
	
	
	if (isset($_GET['fakedate'])) {
		$fakedate = $_GET['fakedate'];
		$faketime = mktime(0, 0, 0, substr($fakedate, 5, 7), substr($fakedate, 8, 2), substr($fakedate, 0, 4)); //$fakedate, example =  2014-12-31
	} else {
		$faketime = time();
	}
	
	$dayNamesTab = array('Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi');
	$dayMinusNamesTab = array('Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa');
	$monthNamesTab = array('Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Ao�t', 'Septembre', 'Octobre', 'Novembre', 'Decembre');
	
	
	
	$message=array(	"this"=>"This",			"this_fr-fr"=>"Ce",
					"last"=>"Last",			"last_fr-fr"=>"Dernier",
					"today"=>"Today",		"today_fr-fr"=>"Aujourd'hui",	
					"tomorrow"=>"Tomorrow",	"tomorrow_fr-fr"=>"Demain",
					"week"=>"week",			"week_fr-fr"=>"semaine",
					"weekof"=>"week of",	"weekof_fr-fr"=>"semaine du",
					"andthisweekend"=>"and this week-end",	"andthisweekend_fr-fr"=>"et ce week-end",
					"event"=>"event",		"event_fr-fr"=>"evenement",
					"events"=>"events",		"events_fr-fr"=>"evenements",
					"forthe"=>"for the",	"forthe_fr-fr"=>"pour le",
					"forthis"=>"for this",	"forthis_fr-fr"=>"pour ce",
					"forthef"=>"for the",	"forthef_fr-fr"=>"pour la",
					"friday"=>"friday",		"friday_fr-fr"=>"vendredi");
					
	
	$messageDay=array(	"1"=>"monday",			"1_fr-fr"=>"lundi",
						"2"=>"tuesday",			"2_fr-fr"=>"mardi",
						"3"=>"wednesday",		"3_fr-fr"=>"mercredi",
						"4"=>"thursday",		"4_fr-fr"=>"jeudi",
						"5"=>"friday",			"5_fr-fr"=>"vendredi",
						"6"=>"saturday",		"6_fr-fr"=>"samedi",
						"7"=>"sunday",			"7_fr-fr"=>"dimanche");
	
	$messageMonth=array("1"=>"january",			"1_fr-fr"=>"janvier",
						"2"=>"febrary",			"2_fr-fr"=>"fevrier",
						"3"=>"mars",			"3_fr-fr"=>"mars",
						"4"=>"april",			"4_fr-fr"=>"avril",
						"5"=>"may",				"5_fr-fr"=>"mai",
						"6"=>"june",			"6_fr-fr"=>"juin",
						"7"=>"july",			"7_fr-fr"=>"juillet",
						"8"=>"august",			"8_fr-fr"=>"aout",
						"9"=>"september",		"9_fr-fr"=>"septembre",
						"10"=>"october",		"10_fr-fr"=>"octobre",
						"11"=>"november",		"11_fr-fr"=>"novembre",
						"12"=>"december",		"12_fr-fr"=>"decembre");
	

	$three_months_in_seconds = 60 * 60 * 24 * 28 * 3;
	$three_months_ago = date("Y-m-d", time() - $three_months_in_seconds);
	$three_months_from_today = date("Y-m-d", time() + $three_months_in_seconds);
	
	$only_today_in_seconds = 60 * 60 * 24 * 0;
	$only_today = date("Y-m-d", $faketime + $only_today_in_seconds);
	
	$one_day_in_seconds = 60 * 60 * 24 * 1;
	$one_day_from_today = date("Y-m-d", $faketime + $one_day_in_seconds);
	$tomorrowTime = strtotime($one_day_from_today);
	
	$three_day_in_seconds = 60 * 60 * 24 * 3;
	$three_day_from_today = date("Y-m-d", $faketime + $three_day_in_seconds);
	
	$seven_day_in_seconds = 60 * 60 * 24 * 7;
	$seven_day_from_today = date("Y-m-d", $faketime + $seven_day_in_seconds);
	
	$titleDay = $messageDay[date('N', $faketime).$lang];
	$titleMonth = $messageMonth[date('n', $faketime).$lang];
	$titleDayNumber = date("j", $faketime);
	$titleYear = date("Y", $faketime);
	$titleLabelDay = $titleDay." ".$titleDayNumber." ".$titleMonth." ".$titleYear;
	
	$todayFormattedRSS = gmdate('Y-m-d\TH:i:s\Z', $faketime);
	
	
	
	
	$lundi = 1;
	$vendredi = 5;
	
	//echo "jour = ".date("w");
	if (date("w", $faketime) == $lundi) {// si on est lundi, on affiche les conferences de la semaine
		$url = 'https://www.googleapis.com/calendar/v3/calendars/'.$agendaID.'/events?key='.$serverKey.'&orderBy=startTime&singleEvents=true&timeMin='.$today.'&timeMax=' . $seven_day_from_today."T00%3A00%3A00%2B00%3A00";
		$labelTitle = $message['forthef'.$lang]." ".$message['weekof'.$lang]." ".$titleLabelDay;
		
	} else if (date("w", $faketime) == $vendredi) {// si on est vendredi, on affiche les conferences du week-end
		$url = 'https://www.googleapis.com/calendar/v3/calendars/'.$agendaID.'/events?key='.$serverKey.'&orderBy=startTime&singleEvents=true&timeMin='.$today.'&timeMax=' . $three_day_from_today."T00%3A00%3A00%2B00%3A00";
		$labelTitle = $message['forthis'.$lang]." ".$message['friday'.$lang]." ".$titleLabelDay." ".$message['andthisweekend'.$lang];

	} else {// sinon on affiche juste les conferences du jour en cours
		$url = 'https://www.googleapis.com/calendar/v3/calendars/'.$agendaID.'/events?key='.$serverKey.'&orderBy=startTime&singleEvents=true&timeMin='.$today.'&timeMax=' . $one_day_from_today."T00%3A00%3A00%2B00%3A00";
		$labelTitle = $message['forthis'.$lang]." ".$titleLabelDay;
	}
	

	// google calendar v3
	//$url = 'https://www.googleapis.com/calendar/v3/calendars/'.$agendaID.'/events?key='.$serverKey.'&orderBy=startTime&singleEvents=true&timeMin='.$today;

	
	$json = file_get_contents($url);
	
	$obj = json_decode($json, true);
	
	
	
	function text2AlphaNum($string)
	{
		$result =  preg_replace('/ /i', '_', $string);
		$result =  preg_replace('/[^a-zA-Z_\-0-9]+/i', '', $result);
	    return $result;
	}
	
	function getId($string)
	{
		$tmp = explode("/", $string);
		return $tmp[sizeof($tmp)-1]; // piece
	}
	
	function dateFormat($string)
	{
		return substr($string, 0, 10);
	}
	
?>

		<title><?php echo $obj['summary']; ?></title> 
		<link href="<?php echo $baseUrl; ?>/" rel="alternate" type="text/html"/>
		<link href="<?php echo $baseUrl; ?>/atom" rel="self" type="application/atom+xml"/>
		
		<id><?php echo $baseUrl; ?></id>
		<updated><?php echo $todayFormattedRSS; ?></updated>
		<category term="LifeStyle"/>
		<subtitle><?php echo sizeof($obj['items'])." ".$message['events'.$lang]." ".$labelTitle; ?></subtitle>
		<description><?php echo sizeof($obj['items'])." ".$message['events'.$lang]." ".$labelTitle; ?></description>
		
		<author>
			<name><?php echo $baseUrl; ?></name>
			<uri><?php echo $baseUrl; ?></uri>
    	</author>

<?php


foreach ($obj['items'] as $event) {
	
	$doc = new DOMDocument();
	@$doc -> loadHTML($event['description']);
	
	$tags = $doc -> getElementsByTagName('img');
	foreach ($tags as $tag) {
       $img =  $tag->getAttribute('src');
		break; // only the first image
	}
	
	$eventStartTime = strtotime($event['start']['dateTime']);
	$eventEndTime = strtotime($event['end']['dateTime']);
	$eventStartTimeRSSFormatted = gmdate('Y-m-d\TH:i:s\Z', strtotime($event['start']['dateTime']));
	$eventUpdateTimeRSSFormatted = gmdate('Y-m-d\TH:i:s\Z', strtotime($event['updated']));
	
	$dayLabel = $messageDay[date("N", $eventStartTime).$lang];
	$dayNumber = date("j", $eventStartTime);
	
	$endDayLabel = $messageDay[date("N", $eventEndTime).$lang];
	$endDayNumber = date("j", $eventEndTime);
	
	
	$monthLabel = $messageMonth[date("n", $eventStartTime).$lang];
	$year = date("Y", $eventStartTime);
	$hour = date("H", $eventStartTime);
	$minute = date("i", $eventStartTime);
	
	$endMonthLabel = $messageMonth[date("n", $eventEndTime).$lang];
	$endYear = date("Y", $eventEndTime);
	$endHour = date("H", $eventEndTime);
	$endMinute = date("i", $eventEndTime);
	
	$yearMonthDay = $year . date("m", $eventStartTime) . (date("d", $eventStartTime));
	$yearMonthDayFakeDate = date("Y", $faketime) . date("m", $faketime) . (date("d", $faketime));
	
	$yearMonthDayTomorrow = date("Y", $tomorrowTime) . date("m", $tomorrowTime) . (date("d", $tomorrowTime));

	$fullLabelDay = "$dayLabel $dayNumber $monthLabel $year $hour:$minute";
	$fullLabelEndDay = "$endDayLabel $endDayNumber $endMonthLabel $endYear $endHour:$endMinute";
		
	$diffDay = ($eventStartTime-$faketime)/(3600*24);
	
	if($diffDay<7 && $diffDay>=0){
		$fullLabelDay = $message['this'.$lang]." $dayLabel $hour:$minute";
	}
	
	if($diffDay<7 && $diffDay<0){
		$fullLabelDay = $message['last'.$lang]." $dayLabel $hour:$minute";
	}
	if ($yearMonthDay == $yearMonthDayFakeDate) {
		$fullLabelDay = $message['today'.$lang]." $hour:$minute";
	} 
	if ($yearMonthDay == $yearMonthDayTomorrow) {
		$fullLabelDay = $message['tomorrow'.$lang]." $hour:$minute";
	}
	
	$backN = array("\n", "\r");
	$backR = "<br/>";
	
	$content = str_replace($backN, $backR, $event['description']);

?>

<entry> 
		<title>[<?php echo $fullLabelDay; ?>] <?php echo htmlspecialchars($event['summary'], ENT_QUOTES, 'UTF-8');?></title>		
		<link href="<?php echo $baseUrl.'/'.text2AlphaNum($event['summary']).'/'.$event['id']; ?>"  rel='alternate' type='text/html'/> 
		<id><?php echo $baseUrl.'/'.text2AlphaNum($event['summary']).'/'.$event['id']; ?></id> 
		<published><?php echo $eventStartTimeRSSFormatted; ?></published>
		<updated><?php echo $eventUpdateTimeRSSFormatted; ?></updated>
		<content type="html">
			<?php echo htmlspecialchars($content, ENT_QUOTES, 'UTF-8');?> &lt;br/&gt; &lt;br/&gt;
			&lt;a href=&quot;http://maps.google.com/maps?q=<? echo urlencode(htmlspecialchars($event['location'], ENT_QUOTES, 'UTF-8'));?>&quot;&gt;
				<? echo htmlspecialchars($event['location'], ENT_QUOTES, 'UTF-8');?>
			&lt;/a>&lt;br/&gt;
			<?php echo $fullLabelDay." > ".$fullLabelEndDay;?>
		</content> 
		
		<link rel="enclosure"
          type="image/jpeg"
          title="<?php echo htmlspecialchars($event['summary'], ENT_QUOTES, 'UTF-8');?>"
          href="<?php echo $img;?>"
          length="1234" />	
		
	</entry>

<?php } ?>

</feed>