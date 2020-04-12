var ps=require("./music");

var url = "https://www.youtube.com/watch?v=k2hGmoWFzaA";
url = "https://www.youtube.com/watch?v=m_9RYQnPu34";
//ps.getAndPushYoutubeSong("https://www.youtube.com/watch?v=nojgLrJ6RBU",id => {console.log("ADDED "+id);});
ps.getAndPushYoutubeSong(url,
        id => {console.log("ADDED "+id);});
//ps.pushSong("/Users/hlemai/Dev/aikev/fryday-radio/musics/k2hGmoWFzaA.m4a",id=> {console.log(id);});

