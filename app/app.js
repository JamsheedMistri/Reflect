// Disable companion app touchmove listeners
document.addEventListener('ontouchstart', function(e) {e.preventDefault()}, false);
document.addEventListener('ontouchmove', function(e) {e.preventDefault()}, false);

// Is playing music?
var playing = false;
// Mouse is down for volume control?
var mouseIsDown = false;
// Should sync the playing indicator with the server?
var shouldChangePlaying = true;

// Change volume using slider
$("#volume").change(function() {
	musicControl("volume " + $("#volume").val());
});

$("#volume").mousedown(function() {
	mouseIsDown = true;
});

$("#volume").bind("touchstart", function(e) {
    mouseIsDown = true;
});

$("#volume").mouseup(function() {
	setTimeout(function() {
		mouseIsDown = false;
	}, 5000);
});

$("#volume").bind("touchend", function(e) {
    setTimeout(function() {
		mouseIsDown = false;
	}, 5000);
});

// Lights on
$("#on").click(function() {
	lightsOn();
});

// Lights off
$("#off").click(function() {
	lightsOff();
});

// Music control
$("#pause").click(function() {
	musicControl("pause");

	if (!playing) {
		$("#play-pause").removeClass("fa-play");
		$("#play-pause").addClass("fa-pause");
		playing = true;
	} else {
		$("#play-pause").removeClass("fa-pause");
		$("#play-pause").addClass("fa-play");
		playing = false;
	}

	shouldChangePlaying = false;
	setTimeout(function() {
		shouldChangePlaying = true;
	}, 5000);
});

$("#previous").click(function() {
	musicControl("previous");
});

$("#next").click(function() {
	musicControl("next");
});

$("#shuffle-on").click(function() {
	musicControl("shuffle on");
});

$("#shuffle-off").click(function() {
	musicControl("shuffle off");
});

// Show playlists button
$("#show-playlists").click(function() {
	$("#playlists").css("display", "block");
});

// Hide the playlists menu if anything is pressed
$("#playlists").click(function() {
	$("#playlists").css("display", "none");
});

// When selecting a playlist, play the URI of the selected item
$(document).on('click', '.playlist', function() {
	musicControl($(this).data('uri'));
});

$("#music-custom").click(function() {
	var answer = prompt("Song title");
	if (answer !== "" && answer !== null) musicControl("play " + answer);
});

$("#artist").click(function() {
	var answer = prompt("Artist name");
	if (answer !== "" && answer !== null) musicControl("artist " + answer);
});

$("#album").click(function() {
	var answer = prompt("Album name");
	if (answer !== "" && answer !== null) musicControl("album " + answer);
});

$("#youtube").click(function() {
	var answer = prompt("Video title");
	if (answer !== "" && answer !== null) youtube(answer);
});

$("#refresh").click(function() {
	$.get("../youtube/youtube-bridge.php", { "id": "stop" });
});

$("#volume-up").click(function() {
	musicControl("volume up");
	$("#volume").val(parseInt($("#volume").val()) + 5);
	mouseIsDown = true;
	setTimeout(function() {
		mouseIsDown = false;
	}, 5000);
});

$("#volume-down").click(function() {
	musicControl("volume down");
	$("#volume").val(parseInt($("#volume").val()) - 5);
	mouseIsDown = true;
	setTimeout(function() {
		mouseIsDown = false;
	}, 5000);
});

function musicControl(arg) {
	$.post('../music/music.php', { input: arg } );
}

function youtube(parameter) {
	$.get("../youtube/youtube.php", { "search": parameter }, function(response) {
		$.get("../youtube/youtube-bridge.php", { "id": response });
	});
}

setInterval(function() {
	changePlayingStatus();
	changeVolumeStatus();
}, 5000);

function lightsOn() {
	$.post('../lights.php', { input: "on" } );
}

function lightsOff() {
	$.post('../lights.php', { input: "off" } );
}

function changePlayingStatus() {
	if (!shouldChangePlaying) return;
	$.post("../music/music.php", { input: "is playing" }, function(e) {
		if (e.trim() === "true") {
			if (playing) return;
			$("#play-pause").removeClass("fa-play");
			$("#play-pause").addClass("fa-pause");
			playing = true;
		} else if (e.trim() === "false") {
			if (!playing) return;
			$("#play-pause").removeClass("fa-pause");
			$("#play-pause").addClass("fa-play");
			playing = false;
		}
	});
}

function changeVolumeStatus() {
	if (mouseIsDown) return;
	$.post("../music/music.php", { input: "get volume" }, function(e) {
		if (mouseIsDown) return;
		$("#volume").val(parseInt(e));
	});
}

function updatePlaylists() {
	$.post("../music/list_playlists.php", function(response) {
		playlists = jQuery.parseJSON(response);
		for (playlist in playlists) {
			$("#playlists").append(`<div class="playlist" data-uri="${playlists[playlist]['uri']}">${playlists[playlist]['name']}</div>`);
		}
	});
}

$(document).ready(function() {
	changePlayingStatus();
	changeVolumeStatus();
	updatePlaylists();
});