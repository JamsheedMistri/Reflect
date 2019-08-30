![logo](https://i.imgur.com/5Wjul9M.png)
Web-based software for magic mirrors
# Info
## Introduction
"A magic mirror is a Raspberry Pi powered monitor behind a double sided mirror. A mostly black web page allows you to add some widgets to the mirror’s reflection as if by magic." ([Dylan Pierce](http://blog.dylanjpierce.com/raspberrypi/magicmirror/tutorial/2015/12/27/build-a-magic-mirror.html)). 

Reflect is web-based software for magic mirrors, built specifically to run on a Raspberry Pi. It's always a fun DIY project to build a magic mirror yourself, but sometimes getting functioning code can be annoying.

[My friend](https://github.com/kylemarino22) and I built a magic mirror over the summer of 2017, and it was a blast. However, when it came time to write the code, it took much longer than expected — the Raspberry Pi is somewhat limited in what integrations it can have (like Spotify), and we needed to find a way around this.

This repository contains the code for my currently functioning magic mirror, which has seen many revisions since 2017. At the time of writing this, in 2019, Reflect is currently on version 2.0, and I'm happy that it's had so much support.

You can check out a YouTube demo of the software [here](https://www.youtube.com/watch?v=Avk8C6v76iQ) for v1.0 and ~~here~~ for v2.0 (coming soon)!

## Features
* Listens to voice commands and responds with helpful information
* Plays music from Spotify (requies Spotify premium)
* Displays current time, date, weather, news headlines (from Hacker News and BBC), & Bitcoin prices
* Lists select current devices that are connected to the home wifi (requires supported router)
* Controls everything through a companion app

## Supported Hardware
* Sufficiently large monitor
* Raspberry Pi
* Sufficient power source
* Speaker (optional — needed for Spotify and responsive voice)
* Microphone (optional — needed for voice commands)
* External device connected to Raspberry Pi that can switch the lightswitch (optional — needed for built-in lightswitch functionality)

## List of Supported Voice Commands
### Informational Commands
* Tell you the time
   * _Okay mirror, what time is it?_
* Tell you the date
   * _Okay mirror, what is the date?_
* Tell you the weather for the next seven days
   * _Okay mirror, what will the weather be like tomorrow?_
   * _Okay mirror, what is the weather like today?_
   * _Okay mirror, what will the weather be like in 3 days?_
   * _Okay mirror, what will the weather be like on Sunday?_

### Entertainment Commands
* Play YouTube videos on the display
   * _Okay mirror, YouTube Minecraft_
* Play your preconfigured favorites playlist on Spotify
   * _Okay mirror, play music_
* Play the global top 50 songs on Spotify
   * _Okay mirror, play the top 50_
* Play a specific song on Spotify
   * _Okay mirror, play Despacito_
* Play a specific artist on Spotify
   * _Okay mirror, play artist Queen_
* Play a specific album on Spotify
   * _Okay mirror, play album Happiness Begins_
* Play a specific playlist from your library on Spotify
   * _Okay mirror, play playlist Favorites_
* Music controls
   * _Okay mirror, pause music_
   * _Okay mirror, resume music_
   * _Okay mirror, shuffle off_
   * _Okay mirror, shuffle on_
   * _Okay mirror, next song_
   * _Okay mirror, previous song_
* Give you information on the current song on Spotify
   * _Okay mirror, what song is this?_
   * _Okay mirror, who sings this?_

### Utility Commands
* Turn off the lights
   * _Okay mirror, lights off_
* Turn on the lights
   * _Okay mirror, lights on_
* Reboot the Raspberry Pi
   * _Okay mirror, reboot_
* Shut down the Raspberry Pi
   * _Okay mirror, shut down_
* Adjust system volume
   * _Okay mirror, volume 80_
   * _Okay mirror, volume down_
   * _Okay mirror, volume up_

## Display
The display shows the following:

* Top left
   * Current news headlines from Hacker News and BBC News
* Top right
   * The time, date, and weather
* Bottom left
   * The current playing song, volume, and whether or not shuffle is on
* Bottom right
   * The current Bitcoin price

## Companion App
You will find a screenshot of the companion app below, which has many features, including:

* Live updating & changeable volume slider/buttons
* Live updating & clickable play/pause button
* Next/previous song buttons
* Shuffle button
* "Playlist" button which shows a list of all of your playlists
* "Artist" button which allows you to enter an artist to play
* "Album" button which allows you to enter an album to play
* "Custom Song" button which allows you to play a custom song
* "YouTube Video" button which plays the first result of your search query
* "Refresh" button to refresh the page
* Lightswitch on/off buttons

## Scanning Devices
I created a simple scraper that makes a request to my router's homepage every few seconds, searching for MAC addresses (which are displayed on the homepage). If Reflect finds a MAC address that belongs to a device that one of my family members own, Reflect will add their name to the "Family Members Home" list.

If you don't want this functionality or you don't have a supported router, Reflect will not work unless you do the following:
* Remove the following lines from `index.php`:

```html
<div id="middle-right" class="requires-internet">
	<div class="detector-title" id="detector-important-title">Family Members Home</div>
	<div class="detector-info" id="detector-important">Loading...</div>
	<br>
	<div class="detector-title" id="detector-guests-title">Guests</div>
	<div class="detector-info" id="detector-guests">Loading...</div>
</div>
```

```html
<script src="assets/js/devices.js"></script>
<script src="assets/js/detector.js"></script>
```

The current version of the scraper is in `detector/detect.php`, and works with most Xfinity/Comcast routers. If it doesn't work, take a look at the script and try to modify it to scrape the correct information.

## Lightswitch Control
We connected a simple servo motor to the Raspberry Pi GPIO pin and attached it to my lightswitch. It was a simple and fun DIY project that enables the servo to flip the switch when it receives a signal. However, **the code for this is not provided with Reflect.**

If you have something like this or anything else that can switch the lights on and off, you must configure it in `lights.php`. Otherwise, the lightswitch buttons and commands will not be functional. If you prefer not to see them, you can simply delete them from `app/index.php`

## Images
![pictures](https://i.imgur.com/1xITOAX.jpg)

# Dependencies
## Software
* Web server (apache or nginx recommended)
* PHP (apache or nginx support required)
* [mopidy](http://mopidy.com) and [mopidy-spotify](https://github.com/mopidy/mopidy-spotify) installed 
* mopidy-spotify configured to use a premium Spotify account

## Needed API Keys (all free)
* **OpenWeatherMap** — http://api.openweathermap.org
* **News API** — http://newsapi.org
* **Spotify API** — https://developer.spotify.com/documentation/web-api/
* **YouTube API** — https://developers.google.com/youtube/v3/

# Usage
* The mirror is located on http://localhost/
* The companion app is located under http://localhost/app
   * If you want to use the companion app, find your Raspberry Pi's local IP address and use that in place of `localhost` in your mobile browser. If you do this, you must configure the IP to be static.
   * Alternatively, you can set up an mDNS resolver on your Raspberry Pi, enabling anyone on the network to access it through a **.local** domain without a static domain, for example: http://mirror.local
   * For iOS, you can click the button at the bottom of Safari to add it to your homescreen.

# Setup
* Clone the repository into `/var/www/html`
* Configure `config/config.js` and `config/config.ini.php` by inserting your API keys and your current city
* Configure the Raspberry Pi to open Chromium in kiosk incognito mode on boot
   * I'd recommend using LXDE-pi's autostart functionality. Simply add this line to the end of `/home/pi/.config/lxsession/LXDE-pi/autostart`:

```bash
@chromium-browser --kiosk --incognito http://localhost/
```

* Configure mopidy and mopidy-spotify to run on boot
* Give the file `volume` executable permissions: `chmod a+x ./volume`

# Questions, Issues, and Contributing
Please feel free to make any pull requests or issues, but I cannot guarantee that I will be able to read them all in a timely fashion. If you have any questions, please feel free to create an issue and I can respond as fast as possible. Thank you!
