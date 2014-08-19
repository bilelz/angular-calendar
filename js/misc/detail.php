<!-- special page for BOT -->
<?php
	$agendaID = "u825pd9kqiahvdqljsk29rass4";
	$eventID = $_GET["event"];
	$url = "http://www.google.com/calendar/feeds/" . $agendaID . "%40group.calendar.google.com/public/full/" . $eventID . "?alt=json";
	
	$json = file_get_contents($url);
	$obj = json_decode($json, true);
	echo $obj['entry']['title']['$t'];
	
	$doc = new DOMDocument();
	@$doc -> loadHTML($obj['entry']['content']['$t']);
	
	$tags = $doc -> getElementsByTagName('img');
	foreach ($tags as $tag) {
       $img =  $tag->getAttribute('src');
		break; // only the first image
	}
	
	function dateFormat($string){
		return substr($string, 0, 10);
	}
?>
<!doctype html>
<html>
  <head>

	<title><?php echo $obj['entry']['title']['$t'] ?> - Caldev.io</title>
	
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:site" content="">
	<meta name="twitter:creator" content="@bilelz">
	<meta name="twitter:title" content="<?php echo $obj['entry']['title']['$t'] ?>">
	<meta name="twitter:description" content="<?php echo strip_tags($obj['entry']['content']['$t'])?>">
	<meta name="twitter:image:src" content="<?php echo $img ?>">

</head>
<body>
<div  itemscope itemtype="http://schema.org/Event">
			
	<h1 itemprop="name"><?php echo $obj['entry']['title']['$t'] ?></h1>
	
	<meta itemprop="image" content="<?php echo $img ?>">
	
	<link itemprop="url" href="." />
	
	<meta itemprop="startDate" content=" <?php echo $obj['entry']['gd$when'][0]['startTime']?>">
	<meta itemprop="endDate" content="<?php echo $obj['entry']['gd$when'][0]['endTime']?>">
	
	<p>
		<?php echo $obj['entry']['content']['$t']?>
	</p>
	
	<span itemprop="location" itemscope itemtype="http://schema.org/Place">
		
							<span class="maplink"  itemprop="name"> 
								<?php echo $obj['entry']['gd$where'][0]['valueString']?>
							</span> 
						</span>
</div>	

<a href="https://plus.google.com/+BilelZeghad?rel=author" target="_blank">Bilelz</a>			
</body>
</html>
