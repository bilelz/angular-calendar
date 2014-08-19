<!-- special page for BOT -->
<?php
	$agendaID = "u825pd9kqiahvdqljsk29rass4";
	
	$today =  date('Y-m-d');
	//https://www.google.com/calendar/feeds/u825pd9kqiahvdqljsk29rass4%40group.calendar.google.com/public/full?alt=json&orderby=starttime&sortorder=ascending&start-min=2014-08-16
	$url = "http://www.google.com/calendar/feeds/" . $agendaID . "%40group.calendar.google.com/public/full/?start-min=".$today."&orderby=starttime&sortorder=ascending&alt=json";
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
	
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:site" content="">
	<meta name="twitter:title" content="CalDev.io">
	<meta name="twitter:description" content="Calendar for developers & designers">
	<meta name="twitter:creator" content="bilelz">
	<meta name="twitter:image:src" content="http://caldev.io/js/misc/cache/index.png">


</head>
<body>
	<ul>
		
	

<?php

foreach ($obj['feed']['entry'] as $event) {
	
	$doc = new DOMDocument();
	@$doc -> loadHTML($event['content']['$t']);
	
	$tags = $doc -> getElementsByTagName('img');
	foreach ($tags as $tag) {
       $img =  $tag->getAttribute('src');
		break; // only the first image
	}
	

?>

<li>
<a href="/<?php echo text2AlphaNum($event['title']['$t']).'/'.getId($event['id']['$t']); ?>" itemscope itemtype="http://schema.org/Event">
						<link itemprop="url" href="/<?php echo text2AlphaNum($event['title']['$t']).'/'.getId($event['id']['$t']); ?>" />
						<span itemprop="name"><?php echo utf8_decode($event['title']['$t']);?></span>
						
						
							<meta itemprop="image" content="<?php echo $img;?>">
						
						
						<span itemprop="location" itemscope itemtype="http://schema.org/Place">
								<span itemprop="name"> 
									<?php echo utf8_decode ($event['gd$where'][0]['valueString']);?>
									</span>
						</span>
						
						
						<meta itemprop="startDate" content="<?php echo dateFormat($event['gd$when'][0]['startTime']); ?>">
						<meta itemprop="endDate" content="<?php echo dateFormat($event['gd$when'][0]['endTime']); ?>">
						
				</a>
</li>
<?php } ?>

</ul>
<a href="https://plus.google.com/+BilelZeghad?rel=author" target="_blank">Bilelz</a>			
</body>
</html>
