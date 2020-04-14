# Set global param
set("log.file.path","log/basic-radio.log")
set("server.telnet",true)

# default playlist
myplaylist = playlist(id="playlist",
        #length=3600.0, default_duration=1800.0,timeout=90.0,
        mode="random",
        reload=300,
        reload_mode="seconds",
        "./musics/default")

radio = myplaylist

fryday = request.queue(id="queue")

radio = fallback(id="switcher",track_sensitive = false, 
        [fryday, radio, blank(duration=5.)])

# iTunes-style (so-called "dumb"--but good enough for me) crossfading:
# radio = crossfade(start_next=10.,fade_out=10.,fade_in=10.,radio)
radio=crossfade(fade_out=10.,fade_in=10.,radio)

output.icecast(%mp3,
	host="192.168.1.210", port=8005, user="fryday",
        password = "Vekia199", mount = "/",
        radio)
