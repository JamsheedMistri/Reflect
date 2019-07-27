$(document).ready(function() {
	detect();
});

function detect() {
	$.get("detector/detect.php", function(response) {
		var data;
		try {
			data = jQuery.parseJSON(response);
		} catch (e) {
			detect();
			return;
		}

		for (var key in data["connected"]) {
			connect(data[key]);
		}

		for (var key in data["disconnected"]) {
			disconnect(data[key]);
		}

		updateDevices(data["devices"]);

		detect();
	});
}

function connect(device) {
	if (device in devices) {
		// Do something when someone important connects

	}
}

function disconnect(device) {
	if (device in devices) {
		// Do something when someone important disconnects

	}
}

function updateDevices(new_devices) {
	var important = "";
	var guests = "";
	for (var key in new_devices) {
		if (new_devices[key] in devices) {
			if (devices[new_devices[key]]['guest']) {
				guests += devices[new_devices[key]]['owner'] + "<br>";
			} else {
				important += devices[new_devices[key]]['owner'] + "<br>";
			}
		}
	}

	if (important == "") {
		$("#detector-important-title").css("display", "none");
		$("#detector-important").css("display", "none");
	} else {
		$("#detector-important-title").css("display", "block");
		$("#detector-important").css("display", "block");
		$("#detector-important").html(important);
	}

	if (guests == "") {
		$("#detector-guests-title").css("display", "none");
		$("#detector-guests").css("display", "none");
	} else {
		$("#detector-guests-title").css("display", "block");
		$("#detector-guests").css("display", "block");
		$("#detector-guests").html(guests);
	}
}