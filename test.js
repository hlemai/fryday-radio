var ps=require("./pushsong");

var url = "https://www.youtube.com/watch?v=k2hGmoWFzaA"
//ps.getAndPushYoutubeSong("https://www.youtube.com/watch?v=nojgLrJ6RBU",id => {console.log("ADDED "+id);});
ps.getAndPushYoutubeSong(url,
        id => {console.log("ADDED "+id);});
//ps.pushSong("/Users/hlemai/Dev/aikev/fryday-radio/musics/k2hGmoWFzaA.m4a",id=> {console.log(id);});

