var music=require("./music")

if (process.argv.length === 2) {
    console.error('Expected at least one argument!');
    process.exit(1);
  }

var url=process.argv[2];
console.log("Pushing :"+url);
music.getAndPushYoutubeSong(url, id => {console.log("id : "+id);});