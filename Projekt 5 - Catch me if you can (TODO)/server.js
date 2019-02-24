const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 8080});

const clientsDb = [];

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.warn(`Received: ${message}`);

    const parsedData = JSON.parse(message);

        const clientRecord = clientsDb.find(client => client.id === parsedData.data.id);

        if (clientRecord) {
            clientRecord.lat = parsedData.lat;
            clientRecord.lng = parsedData.lng;
        } else {
            clientsDb.push(parsedData);
        }

        wss.clients.forEach(client => client.send(JSON.stringify(clientsDb)))
    })

ws.send(JSON.stringify(clientsDb));
  
})