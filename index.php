<!DOCTYPE html>
<html>
<head>
  <title>Mirror</title>
  <link rel="stylesheet" href="assets/fa/css/all.css" />
  <link rel="stylesheet" href="assets/css/index.css" />
  <link rel="shortcut icon" href="favicon.ico">
  <link href="https://fonts.googleapis.com/css?family=Didact+Gothic:400" rel="stylesheet">
</head>
<body>
	<div id="top-right">
		<div id="time"></div>
		<div id="date"></div>
		<br />
		<div class="requires-internet">
			<div id="icon"></div>
			<div id="temperature"></div>
			<div id="city"></div>
		</div>
	</div>
	<div id="middle-right" class="requires-internet">
		<div class="detector-title" id="detector-important-title">Family Members Home</div>
		<div class="detector-info" id="detector-important">Loading...</div>
		<br>
		<div class="detector-title" id="detector-guests-title">Guests</div>
		<div class="detector-info" id="detector-guests">Loading...</div>
	</div>
	<div id="bottom-right" class="requires-internet">
		<div id="bitcoin">$<span id="bitcoin-value"></span> = 1 <img src="assets/img/btc.png" style="height: 1em; margin-bottom: -5px;" /></div>
		Current Bitcoin Value
	</div>
	<div id="bottom-left">
		<div id="music-is-playing">
		Currently Playing
			<div id="song-name"></div>
			<div id="song-artist"></div>
			<br />
		</div>
		<div id="volume"><i class="fas fa-volume-up"></i> <span id="volume-percent"></span></div>
		<div id="shuffle"><i class="fas fa-random"></i> <span id="shuffle-on-off"></span></div>
	</div>
	<div id="no-internet">
		<h1><i class="fas fa-wifi"></i> No Internet</h1>
	</div>
	<div id="top-left" class="requires-internet">
		<div id="news-title">News Headlines</div>
		<div class="news-source-title">BBC</div>
		<div class="news-article" id="bbc-1">Loading...</div>
		<div class="news-article" id="bbc-2"></div>
		<div class="news-article" id="bbc-3"></div>
		<br />
		<div class="news-source-title">Hacker News</div>
		<div class="news-article" id="hn-1">Loading...</div>
		<div class="news-article" id="hn-2"></div>
		<div class="news-article" id="hn-3"></div>
	</div>
	<div id="youtube">
		<iframe id="youtube-iframe" width="700" height="394" src="" frameborder="0"></iframe>
	</div>
</body>
<script src="config/config.js"></script>
<script src="assets/js/utils.js"></script>
<script src="assets/js/annyang.js"></script>
<script src='assets/js/voice.js'></script>
<script src="assets/js/jquery.js"></script>
<script src="assets/js/speech.js"></script>
<script src="assets/js/display.js"></script>
<script src="assets/js/devices.js"></script>
<script src="assets/js/detector.js"></script>
</html>
