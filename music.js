var net=require("net");

var config=require("./config/config");

function getDataOnMessage(message,callback) {
    var client = new net.Socket();
    client.connect(config.SOCKETPORT, '127.0.0.1', function() {
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
    getDataOnMessage("/.start",callback);
}

module.exports.stop= function(callback) {
    getDataOnMessage("/.stop",callback);
}

module.exports.skip= function(callback) {
    getDataOnMessage("/.skip",callback);
}

module.exports.remaining= function(callback) {
    getDataOnMessage("/.remaining",callback);
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
    var cmdcommon="youtube-dl --write-thumbnail --write-info-json --no-playlist";
    var cmd=cmdcommon+" -x --audio-format "+config.MUSICEXT+" --output '"+config.MUSICPATH+"%(id)s.%(ext)s' "+ url;
    if(config.MUSICEXT=="m4a") {
        cmd=cmdcommon+" -f 'bestaudio[ext="+config.MUSICEXT+"]' --output '"+config.MUSICPATH+"%(id)s.%(ext)s' "+ url;
    }
    const { exec } = require("child_process");
    console.log("EXEC : "+cmd);

    var ret=exec(cmd,(err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            console.log("####ERROR");
            callback("ERROR");
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
        if(id=== "ERROR" ) {
            callback({id:"ERROR"});
        }
        else {
            console.log (config.MUSICPATH+id+"."+config.MUSICEXT);
            this.pushSong(config.MUSICPATH+id+"."+config.MUSICEXT,played => {
                callback({
                    "id":id,
                    "url":url,
                    "number":played
                });
            });
        }
    });
}


