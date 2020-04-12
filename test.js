import { getOnAirNumber, getAndPushYoutubeSong, getQueueIds } from "./music";

var url1 = "https://www.youtube.com/watch?v=k2hGmoWFzaA";
var url2 = "https://www.youtube.com/watch?v=m_9RYQnPu34";
//ps.getAndPushYoutubeSong("https://www.youtube.com/watch?v=nojgLrJ6RBU",id => {console.log("ADDED "+id);});

getOnAirNumber(data => {
        console.log("ONAIR : "+data);
        getAndPushYoutubeSong(url1,function() {
                getAndPushYoutubeSong(url2,id => {
                        console.log("ADDED "+id);
                        getQueueIds( lst=> {
                                console.log("Ma liste : "+lst);
                                lst.forEach(t=>console.log("   Queue :"+t));
                        }); 
                });
        });
});

//ps.pushSong("/Users/hlemai/Dev/aikev/fryday-radio/musics/k2hGmoWFzaA.m4a",id=> {console.log(id);});

