var music = require("./music");

var url1 = "https://www.youtube.com/watch?v=k2hGmoWFzaA";
var url2 = "https://www.youtube.com/watch?v=m_9RYQnPu34";

music.getOnAirNumber(data => {
        console.log("ONAIR : "+data);
        music.getAndPushYoutubeSong(url1,function() {
                music.getAndPushYoutubeSong(url2,id => {
                        console.log("ADDED "+id);
                        music.getQueueIds( lst=> {
                                console.log("Ma liste : "+lst);
                                lst.forEach(t=>console.log("   Queue :"+t));
                        }); 
                });
        });
});


