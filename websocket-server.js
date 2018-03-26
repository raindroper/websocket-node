var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 9000});

var clients = [];

wss.on('connection', function(ws) {
    clients.push(ws);
    console.log(ws);
    ws.on('message', function(mes) {
        console.log(mes);
        clients.forEach(function(ws1) {
            if(ws1 !== ws) {
                ws1.send(mes);
            }
        })
    })

    ws.on('close', function(message) {
        console.log(message);
        clients = clients.filter(function(ws1) {
            return ws1 !== ws;
        })
    });
});