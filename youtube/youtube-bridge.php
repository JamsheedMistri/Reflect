<?php
// If we are requested with an ID, update the YouTube database to that new ID
if (isset($_GET['id'])) {
	writeToYoutubeFile($_GET['id']);
}
// Otherwise, echo the current ID in the YouTube database
else {
	$database = json_decode(file_get_contents("../db/youtube.json"), true);
	echo $database['id'];
	writeToYoutubeFile('');
}

// Helper function to write to the file with a given ID
function writeToYoutubeFile($id) {
	$data = json_encode([
		'id' => $id
	]);
	file_put_contents('../db/youtube.json', $data);
}