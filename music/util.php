<?php
function invalidJSONFile($file) {
	return !file_exists($file) || file_get_contents($file) == '' || json_decode(file_get_contents($file)) == null;
}