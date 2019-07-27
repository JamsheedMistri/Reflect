<?php
// This is the endpoint file for registering the Spotify API for the first time.
require_once '../config/config.ini.php';
require_once '../Requests/library/Requests.php';

Requests::register_autoloader();

// Get auth code from authorizing Spotify
$code = $_GET['code'];

$headers = array('Authorization' => "Basic $SPOTIFY_BASE64_KEY");

$data = [
	'grant_type' => 'authorization_code',
	'code' => $code,
	'redirect_uri' => $SPOTIFY_AUTH_URL
];

$request = Requests::post('https://accounts.spotify.com/api/token', $headers, $data);

// This file contains the main refresh token. The actual auth code stored in here expires after an hour.
file_put_contents('../db/spotify_codes.json', $request->body);

echo 'Successfully saved token!';