<?php
require_once '../config/config.ini.php';
// Scrape router homepage
$raw_devices = explode("\n", file_get_contents($ROUTER_HOMEPAGE));
$devices = [];

// Get mac addresses into $devices array
foreach ($raw_devices as $line) {
	if (strpos($line, "headers='mac-address'>") !== false) {
		$devices[] = strtoupper(getStrBetween($line, "headers='mac-address'>", "</td>"));
	}
}

$connected = [];
$disconnected = [];

// Get the list of previously connected devices
$database = json_decode(file_get_contents("../db/devices.json"), true);

// Using the database, determine which devices connected
foreach ($devices as $key => $value) {
	if (!in_array($value, $database)) {
		$connected[] = $value;
	}
}

// Using the database, determine which devices disconnected
foreach ($database as $key => $value) {
	if (!in_array($value, $devices)) {
		$disconnected[] = $value;
	}
}

// Overwrite the database so the mirror knows who connected and disconnected
file_put_contents("../db/devices.json", json_encode($devices));

echo json_encode([
	"connected" => $connected,
	"disconnected" => $disconnected,
	"devices" => $devices
]);

function getStrBetween($string, $start, $finish) {
	$string = " ".$string;
	$position = strpos($string, $start);
	if ($position == 0) return "";
	$position += strlen($start);
	$length = strpos($string, $finish, $position) - $position;
	return substr($string, $position, $length);
}
?>
