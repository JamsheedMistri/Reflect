var internetIsUp = true;
var playlists = [];

function updateTime() {
	var minutes = new Date().getMinutes();
	var hours = new Date().getHours();
	var AMorPM;
	if (hours <= 11) {
		AMorPM = "AM";
		if (hours == 0) hours = 12;
	}
	else {
		AMorPM = "PM";
		if (hours !== 12) hours -= 12;
	}
	$("#time").html(hours + ":" + (minutes < 10 ? "0" : "") + minutes + " " + AMorPM);

	var newDate = new Date();
	newDate.setDate(newDate.getDate());
	$('#date').html(daysOfTheWeek[newDate.getDay()] + ", " + monthNames[newDate.getMonth()] + " " + newDate.getDate() + ", " + newDate.getFullYear());
};

function updateWeather() {
	$.get("https://api.openweathermap.org/data/2.5/weather?q=" + WEATHER_GEO_LOCATION + "&mode=json&APPID=" + OPENWEATHERMAP_API_KEY, function(response) {
		changeInternetStatus(true);

		var formatted_response = {
			"icon": response['weather'][0]['icon'],
			"main": response['weather'][0]['main'],
			"city": response['name'],
			"temperature": ((9/5) * (response['main']['temp'] - 273) + 32).toFixed(1)
		};

		$("#icon").html("<img src='assets/img/icons/" + formatted_response['icon'] + ".png' />");
		$("#city").html(formatted_response['main'] + " in <i class='fas fa-map-marker-alt'></i> " + formatted_response['city']);
		$("#temperature").html(formatted_response['temperature'] + "°F");
	})
		.fail(function(){
			changeInternetStatus(false);
		});
}

function updateBitcoin() {
	$.get("http://api.coindesk.com/v1/bpi/currentprice.json", function(response) {
		var json = $.parseJSON(response);
		$("#bitcoin-value").html(numberWithCommas(json['bpi']['USD']['rate_float'].toFixed(2)));
	});
}

function youtube(parameter) {
	$.get("youtube/youtube.php", { "search": parameter }, function(response) {
		$("#youtube-iframe").attr("src", "https://www.youtube.com/embed/" + response + "?autoplay=1");
		$("#youtube-iframe").css("margin-top", "0");
		$("#middle-right").css("display", "none");
	});
}

function youtubeListen() {
	$.get("youtube/youtube-bridge.php", function(response) {
		if (response == "stop") {
			window.location.reload();
		} else if (response !== "") {
			$("#youtube-iframe").attr("src", "https://www.youtube.com/embed/" + response + "?autoplay=1");
			$("#youtube-iframe").css("visibility", "visible");
			$("#middle-right").css("display", "none");
		}
	});
}

function updateNews() {
	$.get("https://newsapi.org/v1/articles?source=hacker-news&sortBy=top&apiKey=" + NEWS_API_KEY, function(response) {
		for (var i = 1; i <= 3; i++) {
			$("#hn-" + i).html("<b>" + i + ".</b> " + response["articles"][i]["title"]);
		}
	});

	$.get("https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=" + NEWS_API_KEY, function(response) {
		for (var i = 1; i <= 3; i++) {
			$("#bbc-" + i).html("<b>" + i + ".</b> " + response["articles"][i]["title"]);
		}
	});
}

function updateMusic() {
	$.post("music/music.php", { "input": "info" }, function(response) {
		var json;
		try {
			json = $.parseJSON(response);
		} catch (e) {
			return;
		}

		if (json['artist'] == null) {
			$("#music-is-playing").css("display", "none");
		} else {
			$("#music-is-playing").css("display", "block");
			$("#song-name").html(json['song']);
			$("#song-artist").html(json['artist'].replace(/\;/g, ", "));
		}
		$("#volume-percent").html(json['volume'] + "%");
		$("#shuffle-on-off").html(capitalizeFirstLetter(json['shuffle'].trim()));
	});
}

function changeInternetStatus(status) {
	if (internetIsUp && !status) {
		// Internet just went down
		$(".requires-internet").css("visibility", "hidden");
		$("#no-internet").css("visibility", "visible");
		internetIsUp = false;
	} else if (!internetIsUp && status) {
		// Internet just went up
		$(".requires-internet").css("visibility", "visible");
		$("#no-internet").css("visibility", "hidden");
		internetIsUp = true;
	}
}

function refreshSpotifyToken() {
	$.get('music/spotify_refresh.php', function(response) {
		if (response !== 'Successfully refreshed!' && internetIsUp) {
			window.location.replace('music/spotify_refresh.php');
		}
		getPlaylists();
	});
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function getPlaylists() {
	$.post("music/list_playlists.php", function(response) {
		playlists = jQuery.parseJSON(response);
	});
}

$(document).ready(function() {
	updateTime();
	setInterval(updateTime, 500);

	youtubeListen();
	setInterval(youtubeListen, 500);

	updateMusic();
	setInterval(updateMusic, 500);

	updateWeather();
	setInterval(updateWeather, 600000);

	updateBitcoin();
	setInterval(updateBitcoin, 600000);

	updateNews();
	setInterval(updateNews, 600000);

	refreshSpotifyToken();
	setInterval(refreshSpotifyToken, 1800000);
});
