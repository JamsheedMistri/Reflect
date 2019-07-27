<?php
// Call this file to refresh the Spotify token and save the new credentials
require_once '../config/config.ini.php';
require_once 'util.php';

if (invalidJSONFile('../db/spotify_codes.json')) {
	die("Unauthorized client. Go to this link to authorize: https://accounts.spotify.com/authorize?client_id=$SPOTIFY_CLIENT_ID&response_type=code&redirect_uri=$SPOTIFY_AUTH_URL");
}

require_once '../Requests/library/Requests.php';

Requests::register_autoloader();

$refresh_token = null;

// Check if the refresh file exists
if (!invalidJSONFile('../db/spotify_refresh.json')) {
	// If it does, check if it has a new refresh token for us
	$refresh_file_JSON = json_decode(file_get_contents('../db/spotify_refresh.json'), true);
	if (array_key_exists('refresh_token', $refresh_file_JSON)) {
		// If it has a new refresh token, then overwrite the codes.json file so we can use it in the future
		$refresh_token = $refresh_json['refresh_token'];
		file_put_contents('../db/spotify_codes.json', json_encode($refresh_json));
	} else {
		// Otherwise, use the old refresh token
		$refresh_token = json_decode(file_get_contents('../db/spotify_codes.json'), true)['refresh_token'];
	}
} else {
	// Otherwise, use the old refresh token
	$refresh_token = json_decode(file_get_contents('../db/spotify_codes.json'), true)['refresh_token'];
}

$headers = array('Authorization' => "Basic $SPOTIFY_BASE64_KEY");

$refresh_data = [
	'grant_type' => 'refresh_token',
	'refresh_token' => $refresh_token,
	'redirect_uri' => $SPOTIFY_AUTH_URL_REFRESH
];

$refresh_request = Requests::post('https://accounts.spotify.com/api/token', $headers, $refresh_data);

// Save the new token in the refresh.json file
file_put_contents('../db/spotify_refresh.json', $refresh_request->body);

echo 'Successfully refreshed!';