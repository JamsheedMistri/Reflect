<?php
require_once '../config/config.ini.php';

$search = str_replace(" ", "%20", $_GET['search']);
$results = json_decode(file_get_contents("https://www.googleapis.com/youtube/v3/search?key=$YOUTUBE_API_KEY&part=snippet&q=" . $search . 
"&type=video"), true);

echo $results["items"][0]["id"]["videoId"];
?>
