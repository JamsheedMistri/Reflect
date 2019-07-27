<?php
require_once '../config/config.ini.php';

// Config
$playlists = [
	"favorites" => [
		"uri" => $FAVORITES_URI,
		"english" => "songs from your favorite playlist."
	],
	"top50" => [
		"uri" => "spotify:user:spotifycharts:playlist:37i9dQZEVXbMDoHDwVN2tF",
		"english" => "the top 50."
	]
];

// Set mopdiy volume to 20
exec("mpc volume 20");

// Input parameter
$input = $_POST['input'];

// Play URI
if (strpos($input, 'spotify:user:') === 0) {
	playURI($input, true);
	echo "Playing your playlist.";
}
// Play preset playlist
else if (array_key_exists($input, $playlists)) {
	playURI($playlists[$input]["uri"]);
	echo "Playing ".$playlists[$input]["english"];
}
// Shuffle off
else if ($input == "shuffle off") {
	exec("mpc random off");
	echo "Turned off shuffle.";
}
// Shuffle on
else if ($input == "shuffle on") {
	exec("mpc random on");
	echo "Turned on shuffle.";
}
// Pause
else if ($input == "pause") {
	exec("mpc pause");
	echo "Paused music.";
}
// Resume
else if ($input == "resume") {
	exec("mpc play");
	echo "Resumed music.";
}
// Next Song
else if ($input == "next") {
	exec("mpc next");
	echo "Playing next song.";
}
// Previous song
else if ($input == "previous") {
	exec("mpc prev");
	echo "Playing previous song.";
}
// Get information about song
else if ($input == "info") {
	$info = [];

	exec("mpc", $info);

	$artist = null;
	$song = null;
	$volume = exec("sudo -u pi ../volume");
	$shuffle = null;

	if (strpos($info[0], 'volume') === 0) {
		$shuffle = getStringBetween($info[0], "random: ", "single");
	} else if (strpos($info[1], '[paused]') === 0) {
        $shuffle = getStringBetween($info[2], "random: ", "single");
    } else if (strpos($info[0], '[paused]') === 0) {
        $shuffle = getStringBetween($info[1], "random: ", "single");
    } else {
		$data = explode(" - ", $info[0]);
		$artist = $data[0];
		$song = $data[1];
		$shuffle = getStringBetween($info[2], "random: ", "single");
	}

	$output = [
		"artist" => $artist,
		"song" => $song,
		"volume" => $volume,
		"shuffle" => $shuffle
	];

	echo @json_encode($output, true);
}
// Get information about song or artist
else if ($input == "song" || $input == "artist") {
	$info = [];
	exec("mpc", $info);
	if (strpos($info[1], '[paused]') === 0 || strpos($info[0], 'volume') === 0) {
		echo "No song is currently being played.";
	} else {
		$tempArray = explode(" - ", $info[0]);
		$artist = $tempArray[0];
		$song = $tempArray[1];
		echo "This song is ".$song." by ".$artist.".";
	}
}
// Volume down
else if ($input == "volume down") {
	exec("sudo -u pi ../volume -");
}
// Volume up
else if ($input == "volume up") {
	exec("sudo -u pi ../volume +");
}
// Custom volume
else if (strpos($input, "volume") === 0) {
	exec("sudo -u pi ../volume ".explode(" ", $input)[1]);
}
// Get volume
else if ($input == "get volume") {
	echo exec("sudo -u pi ../volume");
}
// Get whether or not it's playing
else if ($input == "is playing") {
	echo isPlaying() ? "true" : "false";
}
// Custom song
else if (strpos($input, "play") === 0) {
	$songs = [];
	exec("mpc stop");
	exec("mpc clear");
	exec('mpc search title "'.substr(str_replace("'", "\'", strtolower($input)), 5).'"', $songs);
	exec("mpc add ".$songs[0]);
	exec("mpc play");
	echo "Playing ".substr($input, 5).".";
}
// Custom artist
else if (strpos($input, "artist") === 0) {
	$artists = [];
	exec("mpc stop");
	exec("mpc clear");
	exec('mpc search artist "'.substr(str_replace("'", "\'", strtolower($input)), 7).'"', $artists);
	exec("mpc add ".$artists[0]);
	exec("mpc play");
	echo "Playing ".substr($input, 7).".";
}
// Custom album
else if (strpos($input, "album") === 0) {
	$albums = [];
	exec("mpc stop");
	exec("mpc clear");
	exec('mpc search album "'.substr(str_replace("'", "\'", strtolower($input)), 6).'"', $albums);
	exec("mpc add ".$albums[0]);
	exec("mpc play");
	echo "Playing ".substr($input, 6).".";
}
// Custom playlist
else if (strpos($input, "playlist") === 0) {
	$playlists = [];
	exec("mpc stop");
	exec("mpc clear");
	exec('mpc search playlist "'.substr(str_replace("'", "\'", strtolower($input)), 6).'"', $playlists);
	exec("mpc add ".$playlists[0]);
	exec("mpc play");
	echo "Playing ".substr($input, 6).".";
}

// Play URI
function playURI($uri) {
	exec("mpc stop");
	exec("mpc clear");
	exec("mpc add $uri");
	exec("mpc play");
}

// Check if it's playing
function isPlaying() {
	$info = [];
	exec("mpc", $info);
	return strpos($info[1], '[paused]') !== 0 && strpos($info[0], 'volume') !== 0;
}

function getStringBetween($string, $start, $end){
	$string = ' '.$string;
	$ini = strpos($string, $start);
	if ($ini === 0) return '';
	$ini += strlen($start);
	$len = strpos($string, $end, $ini) - $ini;
	return substr($string, $ini, $len);
}
?>

