var net = require('net');

function pushSong(path) {
    var client = new net.Socket();
    var ret=-1;
    client.connect(1234, '127.0.0.1', function() {
        console.log('Connected');
        //client.write("")
        client.write("queue.push "+path+"\n");
    });

    client.on('data', function(data) {
        console.log('Received: ' + data);
        ret=data;
        client.destroy(); // kill client after server's response
    });
    
    client.on('close', function() {
        console.log('Connection closed');
    });
    return data;
}

function getOnAirNumber() {
    var client = new net.Socket();
    var ret=-1;
    client.connect(1234, '127.0.0.1', function() {
        console.log('Connected');
        //client.write("")
        client.write("request.on_air");
    });

    client.on('data', function(data) {
        console.log('Received: ' + data);
        ret=data;
        client.destroy(); // kill client after server's response
    });
    
    client.on('close', function() {
        console.log('Connection closed');
    });
    return ret;
}

function getMetadat(number) {
    var client = new net.Socket();
    var ret=-1;
    client.connect(1234, '127.0.0.1', function() {
        console.log('Connected');
        //client.write("")
        client.write("request.on_air");
    });

    client.on('data', function(data) {
        console.log('Received: ' + data);
        ret=data;
        client.destroy(); // kill client after server's response
    });
    
    client.on('close', function() {
        console.log('Connection closed');
    });
    return ret;
}



pushSong("/home/pi/Music/flux.m4a");