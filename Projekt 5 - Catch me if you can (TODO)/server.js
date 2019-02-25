const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 8080});

const clientsDb = [];
const chatDb=[];

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.warn(`Received: ${message}`);

    const parsedData = JSON.parse(message);

    if(parsedData.type === 'chat'){
       // console.log("CHAYCHAYCAHYCA")
        chatDb.push(parsedData);

    }

    if(parsedData.type === 'user'){

       // console.log('\nusers\n')
    
    const clientRecord = clientsDb.find(client => client.data.id === parsedData.data.id);

    if (clientRecord) {
      clientRecord.data.lat = parsedData.data.lat;
      clientRecord.data.lng = parsedData.data.lng;
    } else {

      clientsDb.push(parsedData);
    }

    }

    wss.clients.forEach(client => client.send(JSON.stringify(clientsDb)));
    wss.clients.forEach(client => client.send(JSON.stringify(chatDb)));
  });

  ws.send(JSON.stringify(clientsDb));
  ws.send(JSON.stringify(chatDb));
});