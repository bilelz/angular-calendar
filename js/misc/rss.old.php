<?php
//header('Content-type: application/xml; charset=UTF-8');
$agendaID = "1fion5g1t61ltvj1pd0dv6vqek%40group.calendar.google.com";

if (isset($_GET['fakedate'])) {
	$fakedate = $_GET['fakedate'];
	$faketime = mktime(0, 0, 0, substr($fakedate, 2, 2), substr($fakedate, 0, 2), substr($fakedate, 4, 7));
} else {
	$faketime = time();
}

$three_months_in_seconds = 60 * 60 * 24 * 28 * 3;
$three_months_ago = date("Y-m-d\Th:i:sP", time() - $three_months_in_seconds);
$three_months_from_today = date("Y-m-d\Th:i:sP", time() + $three_months_in_seconds);
$only_today_in_seconds = 60 * 60 * 24 * 0;
$only_today = date("Y-m-d\Th:i:s", $faketime + $only_today_in_seconds);
$one_day_in_seconds = 60 * 60 * 24 * 1;
$one_day_from_today = date("Y-m-d\Th:i:s", $faketime + $one_day_in_seconds);
$three_day_in_seconds = 60 * 60 * 24 * 3;
$three_day_from_today = date("Y-m-d\Th:i:s", $faketime + $three_day_in_seconds);
$seven_day_in_seconds = 60 * 60 * 24 * 7;
$seven_day_from_today = date("Y-m-d\Th:i:s", $faketime + $seven_day_in_seconds);

$feed = "http://www.google.com/calendar/feeds/1fion5g1t61ltvj1pd0dv6vqek%40group.calendar.google.com/public/full?orderby=starttime";

// Génère : You should eat pizza, beer, and ice cream every day

$urlPrivate = array("b/0/render", "&gsessionid=OK&sf=true&output=xml");
$urlPublic = array("event", "");

$dayNamesTab = array('Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi');
$dayMinusNamesTab = array('Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa');
$monthNamesTab = array('Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre');

$lundi = 1;
$vendredi = 5;

//echo "jour = ".date("w");
if (date("w", $faketime) == $lundi) {// si on est lundi, on affiche les conférences de la semaine
	$feed = "http://www.google.com/calendar/feeds/1fion5g1t61ltvj1pd0dv6vqek%40group.calendar.google.com/public/full?orderby=starttime" . "&start-max=" . $seven_day_from_today;
	$labelTitle = "Événements - semaine du " . date('d/m/Y');
} else if (date("w", $faketime) == $vendredi) {// si on est vendredi, on affiche le conférences du week-end
	$feed = "http://www.google.com/calendar/feeds/1fion5g1t61ltvj1pd0dv6vqek%40group.calendar.google.com/public/full?orderby=starttime" . "&start-max=" . $three_day_from_today;
	$labelTitle = "Événements - vendredi " . date('d/m/Y') . " et de ce week-end";
} else {// sinon on affiche juste les conférences du jour en cours
	$feed = "http://www.google.com/calendar/feeds/1fion5g1t61ltvj1pd0dv6vqek%40group.calendar.google.com/public/full?orderby=starttime" . "&start-max=" . $one_day_from_today;
	$labelDay = $dayNamesTab[(date('N') == 7) ? 0 : date('N')];
	$labelTitle = "Événements  -  $labelDay " . date('d/m/Y');
}
//echo $feed;

// DOMElement->getElementsByTagName() -- Gets elements by tagname
// nodeValue : The value of this node, depending on its type.
// Load XML File. You can use loadXML if you wish to load XML data from a string

$objDOM = new DOMDocument();
//$objDOM->preserveWhiteSpace = FALSE;
$objDOM -> load($feed);
//make sure path is correct

//$objDOM= fileToObject($fileName);
$note = $objDOM -> getElementsByTagName("entry");
// for each note tag, parse the document and get values for
// tasks and details tag.

$jLabel = $dayNamesTab[(date('N', $faketime) == 7) ? 0 : date('N')];
$jNumber = date("j");
$mLabel = $monthNamesTab[date("n", $faketime) - 1];
$y = date("Y", $faketime);
$h = date("H", $faketime);
$m = date("i", $faketime);

if (isset($_GET['fakedate'])) {
	$fakedate = $_GET['fakedate'];
	$faketime = mktime(0, 0, 0, substr($fakedate, 2, 2), substr($fakedate, 0, 2), substr($fakedate, 4, 7));
	$today = date("Ymd", $faketime);
	$tomorrow = date("Ymd", mktime(0, 0, 0, substr($fakedate, 2, 2), intval(substr($fakedate, 0, 2)) + 1, substr($fakedate, 4, 7)));

} else {
	$today = date('Ymd');
	$tomorrow = date("Ymd", mktime(0, 0, 0, date("m"), date("d") + 1, date("Y")));
}

//echo "today=$today tomorrow=$tomorrow";

$todayFormatted = date(DATE_RSS);

$title = $objDOM -> getElementsByTagName("title");
$title = $title -> item(0);
$title = $title -> nodeValue;

$links = $objDOM -> getElementsByTagName("link");
if ($links -> length > 0) {
	$link = $links -> item(0);
	$link = $link -> getAttributeNode("href");
	$link = $link -> value;
	$link = str_replace($urlPrivate, $urlPublic, $link);
}
/*for($i=0; sizeof($links);$i++) {
 if($links->item($i)->getAttributeNode("rel")->value == "alternate"){
 $link = $links->item($i)->getAttributeNode("href")->value;
 }
 }*/

//echo "<center><h1>$today Conférences pour aujoud'hui $jLabel $jNumber $mLabel $y incha'Allah :</h1></center><br/>";
//<!--[$title]-->
echo "<?xml version='1.0' encoding='utf-8' ?>
<rss version='2.0' xmlns:atom='http://www.w3.org/2005/Atom'>
	<channel> 
		<title>Islam-agenda.fr</title> 
		<copyright>CopyLeft</copyright> 
		<link>http://www.islam-agenda.fr</link> <!--$link -->
		<category>Religion</category> 
		<description>Événements pour le $jLabel $jNumber $mLabel $y incha'Allah</description> 
		<language>fr-fr</language> 
		<lastBuildDate>$todayFormatted</lastBuildDate> 
		<atom:link href='http://www.islam-agenda.fr/rss' rel='self' type='application/rss+xml' />
	";

$nbConf = 0;
foreach ($note as $value) {
	$startTime = $value -> getElementsByTagName("when");
	$startTime = $startTime -> item(0);
	$startTime = $startTime -> getAttributeNode("startTime");
	$startTime = $startTime -> value;
	$day = $y . date("m", strtotime($startTime)) . (date("d", strtotime($startTime)));
	if ($day >= $today) {
		$nbConf++;
	}
}

if ($nbConf > 0) {
	echo "
	<item> 
		<title>[Islam-Agenda] $nbConf $labelTitle</title>
		<guid>http://www.islam-agenda.fr/?0</guid>
		<link>http://www.islam-agenda.fr/?0</link>
	</item> ";
}

$buffer = "";
// pour inverser l'ordre, (bug google calendar apparemment)

foreach ($note as $value) {

	$id = $value -> getElementsByTagName("id");
	$id = $id -> item(0);
	$id = $id -> nodeValue;
	$id = explode("/", $id);
	$id = $id[count($id) - 1];
	// id is after the last slash

	$title = $value -> getElementsByTagName("title");
	$title = $title -> item(0);
	$title = $title -> nodeValue;

	$titleNormalize = normalizeString($title);
	$title = htmlspecialchars($title, ENT_QUOTES, 'UTF-8');
	
	$backN = array("\n", "\r");
	$backR = "<br/>";

	$content = $value -> getElementsByTagName("content");
	$content = $content -> item(0);
	$content = $content -> nodeValue;
	$content = str_replace($backN, $backR, $content);
	$content = htmlspecialchars($content, ENT_QUOTES, 'UTF-8');

	$startTime = $value -> getElementsByTagName("when");
	$startTime = $startTime -> item(0);
	$startTime = $startTime -> getAttributeNode("startTime");
	$startTime = $startTime -> value;

	$updatedTime = $value -> getElementsByTagName("updated");
	$updatedTime = $updatedTime -> item(0);
	$updatedTime = $updatedTime -> nodeValue;
	$updated = date(DATE_RSS, strtotime($updatedTime));

	$when = date("l jS \o\f F Y - h:i A", strtotime($startTime));

	$jLabel = $dayNamesTab[(date("N", strtotime($startTime)) == 7) ? 0 : date("N", strtotime($startTime))];
	$jNumber = date("j", strtotime($startTime));
	$mLabel = $monthNamesTab[date("n", strtotime($startTime)) - 1];
	$y = date("Y", strtotime($startTime));
	$h = date("H", strtotime($startTime));
	$m = date("i", strtotime($startTime));
	$day = $y . date("m", strtotime($startTime)) . (date("d", strtotime($startTime)));
	$dateFormatted = date(DATE_RSS, strtotime($startTime));

	$isToday = ($day == $today);
	$afterToday = ($day >= $today);
	$labelDay = "$jLabel $jNumber $mLabel $y à $h:$m";
	if ($day == $today) {
		$labelDay = "Aujourd'hui à $h:$m";
	} else if ($day == $tomorrow) {
		$labelDay = "Demain à $h:$m";
	}

	$links = $value -> getElementsByTagName("link");
	//echo "sizeof(links):".sizeof($links);
	$link = $links -> item(0);
	$link = $link -> getAttributeNode("href");
	$link = $link -> value;

	$link = "http://www.islam-agenda.fr/detail?" . htmlentities(urlencode($titleNormalize) . "&$id");
	//echo "link:".$link;
	/*
	 for($i=0; sizeof($links);$i++) {

	 if($links->item($i)->getAttributeNode("rel")->value == "alternate"){
	 $link = $links->item($i)->getAttributeNode("href")->value;;
	 //echo $link;
	 }
	 }
	 */
	//echo "<h3>($isToday)$day $title  </h3>";
	//echo "<small> $jLabel $jNumber $mLabel $y $h:$m / $startTime / $when </small>";
	//echo "<blockquote> $content </blockquote>";

	if ($afterToday) {
		$buffer = "
	<item> 
		<title>[$labelDay] $title</title>		
		<link>$link</link> 
		<guid>$link</guid> 
		<pubDate>$updated</pubDate><!--$dateFormatted -->
		<description>$content</description> 
	</item> " . $buffer;

	}

}

echo $buffer;

if ($nbConf > 0) {
	echo "
	<item> 
		<title>[Islam-Agenda] $nbConf $labelTitle</title>
		<guid>http://www.islam-agenda.fr/?1</guid>
		<link>http://www.islam-agenda.fr/?1</link>
	</item> ";
}

echo "
  </channel> 
</rss> ";

function normalizeString($string) {
	$a = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿŔŕ ,?!/\"':&()";
	$b = "aaaaaaaceeeeiiiidnoooooouuuuybsaaaaaaaceeeeiiiidnoooooouuuyybyRr____-------";
	$string = utf8_decode($string);
	$string = strtr($string, utf8_decode($a), $b);
	$string = strtolower($string);
	return utf8_encode($string);
}
 ?>