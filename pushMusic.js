import { getAndPushYoutubeSong } from "./music";

if (process.argv.length === 2) {
    console.error('Expected at least one argument!');
    process.exit(1);
  }

var url=process.argv[2];
console.log("Pushing :"+url);
getAndPushYoutubeSong(url, id => {console.log("id : "+id);});