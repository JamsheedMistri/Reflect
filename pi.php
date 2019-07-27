<?php
$inp = $_POST['input'];
if ($inp == "shutdown") {
	exec("sudo shutdown now");
} else if ($inp == "reboot") {
	exec("sudo reboot");
}
?>