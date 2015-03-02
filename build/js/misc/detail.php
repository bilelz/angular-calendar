<!-- special page for BOT -->
<?php
	header("Content-Type: text/html; charset=UTF-8");
	$agendaID = "u825pd9kqiahvdqljsk29rass4@group.calendar.google.com";
	$clientKey = "AIzaSyA3dweFJyhbf-mJ3mxXqFCFnKRNb9idvJ8";
	$serverKey = "AIzaSyC7oGgEJaPG2ecxEcHD2klMuyIYKpjHbm4";
	
	$eventID = $_GET["event"];
	//$url = "http://www.google.com/calendar/feeds/" . $agendaID . "%40group.calendar.google.com/public/full/" . $eventID . "?alt=json";
	
	$url = 'https://www.googleapis.com/calendar/v3/calendars/'.$agendaID.'/events/'.$eventID.'/?key='.$serverKey;
	$json = file_get_contents($url);
	$obj = json_decode($json, true);
	
	$doc = new DOMDocument();
	@$doc -> loadHTML($obj['description']);
	
	$tags = $doc -> getElementsByTagName('img');
	foreach ($tags as $tag) {
       $img =  $tag->getAttribute('src');
		break; // only the first image
	}
	
	function text2AlphaNum($string)
	{
		$result =  preg_replace('/ /i', '_', $string);
		$result =  preg_replace('/[^a-zA-Z_\-0-9]+/i', '', $result);
	    return $result;
	}
	
	function dateFormat($string){
		return substr($string, 0, 10);
	}
?>
<!doctype html>
<html>
  <head>

	<title><?php echo utf8_decode($obj['summary']) ?> - Caldev.io</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:site" content="">
	<meta name="twitter:creator" content="@bilelz">
	<meta name="twitter:title" content="<?php echo $obj['summary'] ?>">
	<meta name="twitter:description" content="<?php echo strip_tags($obj['description'])?>">
	<meta name="twitter:image:src" content="<?php echo $img ?>">

</head>
<body>
<div  itemscope itemtype="http://schema.org/Event">
			
	<h1 itemprop="name"><?php echo utf8_decode($obj['summary']) ?></h1>
	
	<meta itemprop="image" content="<?php echo $img ?>">
	
	<link itemprop="url" href="http://<?php echo $_SERVER['SERVER_NAME'].'/'.text2AlphaNum($obj['summary']).'/'.$obj['id']; ?>" />
	
	<meta itemprop="startDate" content=" <?php echo $obj['start']['dateTime']?>">
	<meta itemprop="endDate" content="<?php echo $obj['end']['dateTime']?>">
	
	<p>
		<?php echo $obj['description']?>
	</p>
	
	<span itemprop="location" itemscope itemtype="http://schema.org/Place">
		
							<span class="maplink"  itemprop="name"> 
								<?php echo $obj['location']?>
							</span> 
						</span>
</div>	

<a href="https://plus.google.com/+BilelZeghad?rel=author" target="_blank">Bilelz</a>			
</body>
</html>
