<?php
// Get a list of the authorized user's playlists (name and URI)
require_once '../config/config.ini.php';
require_once '../Requests/library/Requests.php';
Requests::register_autoloader();

$token = json_decode(file_get_contents('../db/spotify_refresh.json'), true)['access_token'];
$headers = array('Authorization' => 'Bearer '.$token);

$request = Requests::get("https://api.spotify.com/v1/users/$SPOTIFY_USERNAME/playlists", $headers);

$raw = json_decode($request->body, true);
$playlists = [];

// Iterate through response, and pick out the URI and name in a new array
foreach($raw['items'] as $id => $playlist) {
	$playlists[] = [
		"name" => $playlist['name'],
		"uri" => transformURI($playlist['uri'], $SPOTIFY_USERNAME)
	];
}

// Mopidy doesn't like URIs without spotify:user:USERNAME:playlist:PLAYLIST and Spotify does that by default for some reason
function transformURI($uri, $username) {
	return str_replace("spotify:playlist", "spotify:user:$username:playlist", $uri);
}

echo json_encode($playlists);