import { Socket } from 'net';
var SOCKETPORT=1234;
var MUSICPATH="./musics/";

//var MUSICEXT="m4a";
var MUSICEXT="mp3";

function getDataOnMessage(message,callback) {
    var client = new Socket();
    client.connect(SOCKETPORT, '127.0.0.1', function() {
        console.log('Connected');
        client.write(message+"\n");
    });

    client.on('data', function(data) {
        console.log('Received: ' + data);
        var res="";
        if(data.toString().indexOf("END")) {
            res=data.toString().substr(0,data.toString().indexOf("END")-1);
        }
        else {
            res=data.toString();
        } 
        callback(res);
        client.destroy(); // kill client after server's response
    });
    
    client.on('close', function() {
        console.log('Connection closed');
    });
}

export function start(callback) {
    getDataOnMessage("/.start"+path,callback);
}

export function stop(callback) {
    getDataOnMessage("/.stop"+path,callback);
}

export function skip(callback) {
    getDataOnMessage("/.skip"+path,callback);
}


export function pushSong (path,callback) {
    getDataOnMessage("queue.push "+path,callback);
}

export function getQueueIds (callback) {
    getDataOnMessage("queue.queue",data => {
        console.log(" received : "+data);
        var lstIds=data.split(' ');
        callback(lstIds);
    });
}


export function getOnAirNumber (callback) {
    getDataOnMessage("request.on_air",callback);
}

export function getMetadata(number,callback) {
    getOnAirNumber(request.on_air, number => {
        getDataOnMessage("request.metadata "+number, data=> {
            console.log("   Metadata"+data);
            callback(data);
        });
    });
}

export function getYoutubeSong(url,callback) {
    var cmd="youtube-dl -x --audio-format "+MUSICEXT+" --output '"+MUSICPATH+"%(id)s.%(ext)s' "+ url;
    if(MUSICEXT=="m4a") {
        cmd="youtube-dl -f 'bestaudio[ext="+MUSICEXT+"]' --output '"+MUSICPATH+"%(id)s.%(ext)s' "+ url;
    }
    const { exec } = require("child_process");
    console.log("EXEC : "+cmd);

    var ret=exec(cmd,(err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            console.log("####ERROR");
            return;
        }
        // Should get and parse data to get filename
        var lines = stdout.split('\n');
        var id=lines[0].split(' ')[1];
        id = id.substr(0,id.length-1);
        console.log("Get Video "+id);
        callback(id);
    });

    ret.on("exit",function(code) {console.log("Exited with code "+code);});
}

export function getAndPushYoutubeSong(url,callback) {
    this.getYoutubeSong(url,id => {
        console.log (MUSICPATH+id+"."+MUSICEXT);
        this.pushSong(MUSICPATH+id+"."+MUSICEXT,callback);
    });
}


