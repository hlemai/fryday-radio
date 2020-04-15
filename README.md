# FRYday app

FRYday app is a free tool to push music to a web radio. Music is enqueue from youtube url.
It comes with a RESTFULL service and a small UI.

## Prerequisite

In order to playmusic and to download music, the application need this components :

* [liquidsoap](https://www.liquidsoap.info)
* [youtube-dl](https://github.com/ytdl-org/youtube-dl)
* A [redis](https://redis.io) cache
* [nodejs](https://nodejs.org/en/)

liquidsoap and youtube-dl must be in the path of the user executing FRYday App.

## Playing Music

The system use a LiquidSoap script and server to push music on another web Radio. By default, the script [flux.liq](flux.liq) play the Music in the ./musics/default folder. When a user push an url, the music is interupted to play the sound of the video.
The system comunicate with the liquidsoap server using telnet command. 

The queue must be named "queue".

``` lua
fryday = request.queue(id="queue")

radio = fallback(id="switcher",track_sensitive = false, 
        [fryday, radio, blank(duration=5.)])
```

At the end of the script, you find the code that push the music to a specif temporart radio.

``` lua
output.icecast(%mp3,
	host="192.168.1.210", port=8005, user="fryday",
        password = "Vekia199", mount = "/",
        radio)
```

## Converting and Sending music to Lquidsoap

The file [music.js](music.js) contain a module usefull to convert and to send music to the server. You can use the [pushMusic](pushMusic) script to send music with the command line.

Example:
``` sh
$ ./pushMusic https://www.youtube.com/watch?v=Y6sVyLLakhM
```
## UI

The UI is a small website running on top of a nodejs server.
The configuration file is a javascript module located in [config/config.js](config/config.js)

```javascript
var config={
    "SOCKETPORT":1234,
    "MUSICPATH":"./musics/",
    "REDISPORT":6379,
    "REDISHOST":"127.0.0.1",
    "MUSICEXT":"mp3"

};

module.exports=config;
```

At firts you must install node modules with 

```sh
$ npm install
```

Then you can run the app with 

``` sh
$ node start.js
```

Enjoy the music !
