var net = require('net');

var SOCKETPORT=1234;

function getDataOnMessage(message,callback) {
    var client = new net.Socket();
    client.connect(SOCKETPORT, '127.0.0.1', function() {
        console.log('Connected');
        client.write(message+"\n");
    });

    client.on('data', function(data) {
        console.log('Received: ' + data);
        callback(data);
        client.destroy(); // kill client after server's response
    });
    
    client.on('close', function() {
        console.log('Connection closed');
    });
}

module.exports.pushSong = function (path,callback) {
    getDataOnMessage("queue.push "+path,callback);
};

module.exports.getOnAirNumber = function (callback) {
    getDataOnMessage("request.on_air",callback);
};

module.exports.getMetadata = function(number,callback) {
    getOnAirNumber(request.on_air, number => {
        getDataOnMessage("request.metadata "+number, data=> {
            console.log("   Metadata"+data);
            callback(data);
        });
    });

};
