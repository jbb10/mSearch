<?php
	$url = "http://www.google.com/search?q=";
	switch ($_GET['site']) {
		case 0:
		$url .= urlencode("site:zippyshare.com \"Name:\" ".$_GET['query']." \"Size:\"");
		break;
		case 1:
		$url .= urlencode("site:mediafire.com ".$_GET['query']." \"mb)\" OR \"kb\"");
		break;
	}
	$url .= "&start=".$_GET['resultpage'];
	
	$reader = curl_init();
	curl_setopt($reader, CURLOPT_URL, $url);
	curl_setopt($reader, CURLOPT_HEADER, 0);
	curl_setopt($reader, CURLOPT_RETURNTRANSFER, false);
	curl_exec($reader);
	curl_close($reader);
?>