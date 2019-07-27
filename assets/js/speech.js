var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Process a command from speech
function process(input) {
	input = input.toLowerCase();

	// If they say okay mirror twice or more, remove it
	while (input.startsWith("okay mirror")) {
		input = input.replace("okay mirror ", "");
	}

	// Check for aliases
	if (input.startsWith("turn the lights")) {
		input = input.replace("turn the ", "");
	} else if (input.startsWith("turn on the lights")) {
		input = "lights on";
	} else if (input.startsWith("turn off the lights")) {
		input = "lights off";
	} else if (input.startsWith("play next song") || input.startsWith("play the next song")) {
		input = "next song";
	} else if (input.startsWith("play previous song") || input.startsWith("play the previous song") || input.startsWith("play last song") || input.startsWith("play the last song")) {
		input = "previous song";
	}

	// Cut any extra slack at the beginning
	while (input.startsWith(" ")) {
		input = input.replace(" ", "");
	}

	// Speech correction - often times, the voice recognition doesn't exactly pick up what we want it to
	if (input.startsWith("pause") || input.startsWith("paz") || input.startsWith("paul's") || input.startsWith("house") || input.startsWith("paul's") || input.startsWith("falls")) {
		input = "pause music";
	} else if (input.startsWith("nixon") || input.startsWith("mets") || input.startsWith("next")) {
		input = "next song";
	}

	// --------- //
	// RESPONSES //
	// --------- //

	// YouTube
	if (input.startsWith("youtube")) {
		youtube(input.substring(8));
	}
	// In order to clear the YouTube video off the screen, simply refresh the page
	else if (input.startsWith("clear youtube") || input.startsWith("stop youtube") || input.startsWith("stop the video") || input.startsWith("clear the video") || input.startsWith("clear video") || input.startsWith("stop video") || input.startsWith("refresh") || input.startsWith("reload")) {
		window.location.reload();
	}
	// Lights
	else if (input.startsWith("lights")) {
		// On
		if (input.startsWith("lights on")) {
			lightsOn();
		// Off
		} else if (input.startsWith("lights off")) {
			lightsOff();
		}
	}
	// Time
	else if (input.startsWith("what time") || input.startsWith("what is the time") || input.startsWith("what's the time")) {
		var date = new Date();
		var timeOfDay = " AM";
		var hour = "" + date.getHours();
		var separator = ":";
		var minutes = "" + date.getMinutes();
		if (date.getHours() == 0) {
			hour = "12";
		}

		if (date.getHours() >= 12) {
			if (date.getHours() !== 12) {
				hour = "" + (date.getHours() - 12);
			}
			timeOfDay = " PM";
		}

		if (date.getMinutes() == 0) {
			minutes = "o'clock";
			separator = " ";
		} else if (d.getMinutes() < 10) {
			minutes = "0" + date.getMinutes();
		}
		respond("It is " + hour + separator + minutes + timeOfDay + ".");
	} else if (input.startsWith("what day") || input.startsWith("what date") || input.startsWith("what's the day") || input.startsWith("what's the date") || input.startsWith("what is the date")) {
		var d = new Date();
		var date = d.getDate();
		var day = daysOfTheWeek[d.getDay()];
		var month = monthNames[d.getMonth()];
		var year = d.getFullYear();

		if (date == 1) {
			date = "1st";
		} else if (date == 2) {
			date = "2nd";
		} else if (date == 3) {
			date = "3rd";
		} else if (date == 21) {
			date = "21st";
		} else if (date == 22) {
			date = "22nd";
		} else if (date == 23) {
			date = "23rd";
		} else if (date == 31) {
			date = "31st";
		} else {
			date = date + "th";
		}
		respond("It is " + day + ", " + month + " " + date + ", " + year + ".");
	}

	// ------ //
	// MUSIC //
	// ------ //

	// Artist
	else if (input.startsWith("play artist") || input.startsWith("artist")) {
		if (input.startsWith("play artist")) {
			input = input.substring(5);
		}
		musicControl(input);
	}
	// Album
	else if (input.startsWith("play album") || input.startsWith("album")) {
		if (input.startsWith("play album")) {
			input = input.substring(5);
		}
		musicControl(input);
	}
	// Playlist
	else if (input.startsWith("play playlist") || input.startsWith("playlist")) {
		// Set input to sole playlist name
		if (input.startsWith("play playlist")) {
			input = input.substring(13);
		} else if (input.startsWith("playlist")) {
			input = input.substring(8);
		}

		var URI = null;
		// Check if playlist has a name in common with one of our playlists
		for (playlist in playlists) {
			var trimmedPlaylist = playlists[playlist]['name'].replaceAll(" ", "").toLowerCase();
			var trimmedInput = input.replaceAll(" ", "").toLowerCase();

			if (trimmedPlaylist.includes(trimmedInput)) {
				URI = playlists[playlist]['uri'];
				break;
			}
		}

		if (URI == null) {
			respond("Your library does not contain a playlist with the name " + input + ".");
		} else {
			musicControl(URI);
		}
	}
	// Song
	else if (input.startsWith("play")) {
		if (input.startsWith("play music")) {
			musicControl("favorites");
		} else if (input.startsWith("play top 50") || input.startsWith("play top fifty") || input.startsWith("play popular music") || input.startsWith("play american top fifty") || input.startsWith("play american top 50") || input.startsWith("play the top 50") || input.startsWith("play american top fifty")) {
			musicControl("top50");
		} else {
			musicControl(input);
		}
	}

	// Pause
	else if (input.startsWith("pause")) {
		musicControl("pause");
	}

	else if (input.startsWith("resume")) {
		musicControl("resume");
	}

	// Volume
	else if (input.startsWith("turn it up") || input.startsWith("volume up") || input.startsWith("turn up")) {
		musicControl("volume up");
	}

	else if (input.startsWith("turn it down") || input.startsWith("volume down") || input.startsWith("turn down")) {
		musicControl("volume down");
	}

	else if (input.startsWith("volume")) {
		var number = input.split(" ")[1];
		if (number.length > 0) {
			if (number.substring(number.length - 1, number.length) == "%") {
				number = number.substring(0, number.length - 1);
			}
			musicControl("volume " + number);
		}
	}

	// Shuffle off
	else if (input.startsWith("shuffle off") || input.startsWith("random off")) {
		musicControl("shuffle off");
	}
	// Shuffle on
	else if (input.startsWith("shuffle on") || input.startsWith("random on")) {
		musicControl("shuffle on");
	}
	// Next song
	else if (input.startsWith("next song")) {
		musicControl("next");
	}
	// Previous song
	else if (input.startsWith("previous song")) {
		musicControl("previous");
	}
	// What is this song?
	else if (input.startsWith("what is this song") || input.startsWith("what is playing") || input.startsWith("what is that song") || input.startsWith("what is this") || input.startsWith("what tune is this") || input.startsWith("what tune is playing") || input.startsWith("what song is this")) {
		musicControl("song");
	} else if (input.startsWith("who sings this") || input.startsWith("who is the artist")) {
		musicControl("artist");
	}

	// Shut down
	else if (input.startsWith("shutdown") || input.startsWith("shut down")) {
		piControl("shutdown");
	}

	// Reboot
	else if (input.startsWith("reboot")) {
		piControl("reboot");
	}

	// Weather
	else if (input.indexOf("weather") !== -1) {
		var split = input.split(" ");

		if (split[0] + " " + split[1] == "what is") {
			split.splice(0, 1);
			split.splice(0, 1);
		} else if (split[0] == "what's") {
			split.splice(0, 1);
		} else if (split[0] + " " + split[1] == "what will") {
			split.splice(0, 1);
			split.splice(1, 1);
		}

		if (split[0] == "the") {
			split.splice(0, 1);
		}

		if (split[0] == "weather") {
			split.splice(0, 1);
		}

		if (split[0] == "like") {
			split.splice(0, 1);
		}

		if (split[0] == "for") {
			split.splice(0, 1);
		}

		if (split[0] + " " + split[1] == "going to") {
			split.splice(0, 1);
			split.splice(0, 1);
		}

		if (split[0] == "be") {
			split.splice(0, 1);
		}

		if (split[0] == "like") {
			split.splice(0, 1);
		}

		if (split[0] == "for") {
			split.splice(0, 1);
		}

		if (split[0] == "on") {
			split.splice(0, 1);
		}

		var acceptedEnglish = {"today": 0, "tomorrow": 1, "the day after tomorrow": 2, "day after tomorrow": 2};
		var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
		var words = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6};

		if (split[0] == "in") {
			split.splice(0, 1);
			var rq = split[0];
			if (!isNaN(rq)) {
				weatherControl(rq, "in " + rq + " " + split[1]);
			} else if (rq in words) {
				weatherControl(words.rq, "in " + rq + " " + split[1]);
			}
		} else if (split.length == 1) {
			var rq = split[0];
			if (rq in acceptedEnglish) {
				weatherControl(acceptedEnglish[rq], rq);
			} else if ($.inArray(rq, days)) {
				var d = new Date();
				var today = d.getDay();
				var wanted = days.indexOf(rq);

				if (today == wanted) {
					weatherControl(6, rq);
				} else if (today > wanted) {
					weatherControl((wanted + 7) - today, rq);
				} else if (today < wanted) {
					weatherControl(wanted - today, rq);
				}
			} else {
				respond("I don't know what you mean by \"" + split[0] + "\"");
			}
		} else if (split.length == 3) {
			var rq = split[0] + " " + split[1] + " " + split[2];
			if (rq in acceptedEnglish) {
				weatherControl(acceptedEnglish[rq], rq);
			} else {
				respond("I don't know what you mean by \"" + split[0] + " " + split[1] + " " + split[2] + "\"");
			}
		} else if (split.length == 4) {
			var rq = split[0] + " " + split[1] + " " + split[2] + " " + split[3];
			if (rq in acceptedEnglish) {
				weatherControl(acceptedEnglish[rq], rq);
			} else {
				respond("I don't know what you mean by \"" + split[0] + " " + split[1] + " " + split[2] + " " + split[3] + "\"");
			}
		}
	} else {
		respond("I don't understand what you mean by " + input);
	}
}

function respond(response, cb) {
	responsiveVoice.speak(response, "UK English Male");
}

// Functions
function lightsOn() {
	$.post('lights.php', { input: "on" }, function(response) {
		if (response !== "1") respond("There was an error turning on the lights.");
	});
}

function lightsOff() {
	$.post('lights.php', { input: "off" }, function(response) {
		if (response !== "0") respond("There was an error turning off the lights.");
	});
}

function piControl(arg) {
	$.post('pi.php', { input: arg });
}

function musicControl(arg) {
	$.post('music/music.php', { input: arg }, function(response) {
		if (response !== "") respond(response);
	});
}

function weatherControl(day, english) {
	$.get("https://api.openweathermap.org/data/2.5/forecast/daily?q=Mountain%20View&mode=json&APPID=e8c3883ed14d24207128974494a1c145", function(response) {
		var temperature = ((9/5) * (response['list'][day]['temp']['day'] - 273)) + 32;
		var description = response['list'][day]['weather']['0']['description'];

		respond("The weather " + english + " is " + description + " with an average temperature of " + temperature.toFixed(1) + "°F.");
	});
}

// Recognition
if (annyang) {
	var commands = {
		'okay mirror *input': process
	};

	annyang.addCommands(commands);
	annyang.start();
}

