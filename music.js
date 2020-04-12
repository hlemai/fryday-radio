var net=require("net");

var SOCKETPORT=1234;
var MUSICPATH="./musics/";

//var MUSICEXT="m4a";
var MUSICEXT="mp3";

function getDataOnMessage(message,callback) {
    var client = new net.Socket();
    client.connect(SOCKETPORT, '127.0.0.1', function() {
        console.log('Connected');
        client.write(message+"\n");
    });

    client.on('data', function(data) {
        var res=data.toString();
        if(res.indexOf("END")>0) {
            res=data.toString().substr(0,data.toString().indexOf("END")-1);
        }
        callback(res);
        console.debug("RESULTS : "+res);
        client.destroy(); // kill client after server's response
    });
    
    client.on('close', function() {
        console.log('Connection closed');
    });
}

module.exports.start= function (callback) {
    getDataOnMessage("/.start"+path,callback);
}

module.exports.stop= function(callback) {
    getDataOnMessage("/.stop"+path,callback);
}

module.exports.skip= function(callback) {
    getDataOnMessage("/.skip"+path,callback);
}


module.exports.pushSong= function(path,callback) {
    getDataOnMessage("queue.push "+path,callback);
}

module.exports.getQueueIds= function(callback) {
    getDataOnMessage("queue.queue",data => {
        console.log(" received : "+data);
        var lstIds=data.split(' ');
        callback(lstIds);
    });
}


module.exports.getOnAirNumber= function  (callback) {
    getDataOnMessage("request.on_air",callback);
}

module.exports.getMetadata= function (number,callback) {
    getOnAirNumber(request.on_air, number => {
        getDataOnMessage("request.metadata "+number, data=> {
            console.log("   Metadata"+data);
            callback(data);
        });
    });
}

module.exports.getYoutubeSong= function (url,callback) {
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

module.exports.getAndPushYoutubeSong= function (url,callback) {
    this.getYoutubeSong(url,id => {
        console.log (MUSICPATH+id+"."+MUSICEXT);
        this.pushSong(MUSICPATH+id+"."+MUSICEXT,callback);
    });
}

