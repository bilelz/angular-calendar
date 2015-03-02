<!-- special page for BOT -->
<?php
header("Content-Type: text/html; charset=UTF-8");

	$agendaID = "u825pd9kqiahvdqljsk29rass4@group.calendar.google.com";
	$clientKey = "AIzaSyA3dweFJyhbf-mJ3mxXqFCFnKRNb9idvJ8";
	$serverKey = "AIzaSyC7oGgEJaPG2ecxEcHD2klMuyIYKpjHbm4";

	$today =  date('Y-m-d')."T00%3A00%3A00%2B00%3A00";

	// google calendar v3
	$url = 'https://www.googleapis.com/calendar/v3/calendars/'.$agendaID.'/events?key='.$serverKey.'&orderBy=startTime&singleEvents=true&timeMin='.$today;

	
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
<!doctype html>
<html>
  <head>

	<title>Caldev.io</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:site" content="">
	<meta name="twitter:title" content="CalDev.io">
	<meta name="twitter:description" content="Calendar for developers & designers">
	<meta name="twitter:creator" content="bilelz">
	<meta name="twitter:image:src" content="http://caldev.io/img/index.png">


</head>
<body>
	<ul>
		
	

<?php


foreach ($obj['items'] as $event) {
	
	$doc = new DOMDocument();
	@$doc -> loadHTML($event['description']);
	
	$tags = $doc -> getElementsByTagName('img');
	foreach ($tags as $tag) {
       $img =  $tag->getAttribute('src');
		break; // only the first image
	}
	

?>

<li>
<a href="/<?php echo text2AlphaNum($event['summary']).'/'.$event['id']; ?>" itemscope itemtype="http://schema.org/Event">
						<link itemprop="url" href="/<?php echo text2AlphaNum($event['summary']).'/'.$event['id']; ?>" />
						<span itemprop="name"><?php echo utf8_decode($event['summary']);?></span>
						
						
							<meta itemprop="image" content="<?php echo $img;?>">
						
						
						<span itemprop="location" itemscope itemtype="http://schema.org/Place">
								<span itemprop="name"> 
									<?php echo utf8_decode($event['location']);?>
									</span>
						</span>
						
						
						<meta itemprop="startDate" content="<?php echo $event['start']['dateTime']; ?>">
						<meta itemprop="endDate" content="<?php echo $event['end']['dateTime']; ?>">
						
				</a>
</li>
<?php } ?>

</ul>
<a href="https://plus.google.com/+BilelZeghad?rel=author" target="_blank">Bilelz</a>			
</body>
</html>
