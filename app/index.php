<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="">
	<meta name="author" content="">
	<meta name="viewport" content="user-scalable=1.0,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
	<meta name="format-detection" content="telephone=no">

	<link rel="apple-touch-icon-precomposed" href="logo.png" />
	<link rel="apple-touch-icon" href="logo.png" />
	<link rel="icon" href="favicon.ico">
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />

	<title>Reflect</title>

	<link rel="stylesheet" href="app.css" />
	<link rel="stylesheet" href="../assets/fa/css/all.css" crossorigin="anonymous">
</head>
<body>
	<div id="playlists">
		<div id="close-button">Close</div>
	</div>

	<div id="player">
		<div class="volume-button" id="volume-down"><i class="fas fa-volume-down"></i></div>
		<div id="volume-container">
			<input type="range" min="0" max="100" id="volume">
		</div>
		<div class="volume-button" id="volume-up"><i class="fas fa-volume-up"></i></div>
	</div>

	<div class="section">
		<div class="container">
			<i class="fas fa-backward music-button" id="previous"></i>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<span class="music-button" id="pause"><i id="play-pause" class="fas fa-play"></i></span>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<i class="fas fa-forward music-button" id="next"></i>
			<br>
			<div class="button" id="shuffle-on"><i class="fas fa-random"></i> Shuffle On</div>
			<div class="button" id="shuffle-off"><i class="fas fa-sort-amount-down"></i> Shuffle Off</div>
			<br>
			<div class="button" id="show-playlists"><i class="fas fa-play"></i> Playlist</div>
			<div class="button" id="artist"><i class="fas fa-paint-brush"></i> Artist</div>
			<div class="button" id="album"><i class="fas fa-compact-disc"></i> Album</div>
			<div class="button" id="music-custom"><i class="fas fa-music"></i> Custom Song</div>
			<div class="button" id="youtube"><i class="fab fa-youtube"></i> YouTube Video</div>
			<div class="button" id="refresh"><i class="fas fa-redo-alt"></i> Refresh</div>

			<br><br>

			<div class="button lights-button" id="on"><i class="fas fa-lightbulb"></i> Lights On</div>
			<div class="button lights-button" id="off"><i class="far fa-lightbulb"></i> Lights Off</div>
		</div>
	</div>
	<script src="../assets/js/jquery.js"></script>
	<script src="app.js"></script>
</body>
</html>
