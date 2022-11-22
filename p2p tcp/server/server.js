import net from 'net'
import { help,  isValidUserName, getPort, returnClients } from './server-funcktions.js'

let onlineClients = [];
let clientsSockets = [];
let port = 3000;

const server = net.createServer( function (client) {
  process.stdout.write('The new client successfully connected\n');

  client.write('Server >>>> Welcome! \n');
  client.write('Server >>>> Please type your username \n');

  client.on("data", (data) => {
    
    const input = data.toString().trim();
   
  if (client.userName === undefined) { 
    let isValid = isValidUserName(input, client, onlineClients);
    client.write(isValid);
    if (client.userName !== undefined) {
      setTimeout(() => {
        getPort(client, client.clientPort, client.userName);
      },5);

      setTimeout(() => {
        returnClients(client, onlineClients, clientsSockets)
      },5);

      help(client);
      client.clientPort = ++port;
      clientsSockets.push(client);
    }
  } 
  
  else if (input === '/clients') {
      returnClients(client, onlineClients, clientsSockets);
  }

  else if (input === 'get/clients') {
    for (let i = 0; i < onlineClients.length; i++) {
      returnClients(clientsSockets[i], onlineClients, clientsSockets);
    }
  }

    console.log('data',input);
  });

  client.on('error', (err) => {
    console.log('error', err);
  });

  client.on('close', (data) => {
    onlineClients = onlineClients.filter((v) => {
      if(client.userName !== v)return true;
      return false; 
    });

    clientsSockets = clientsSockets.filter((v) => {
      if (v._writableState.closed !== true) return true;
      return false;
    });
    
    for (let i = 0; i < clientsSockets.length; i++) {
      returnClients(clientsSockets[i], onlineClients, clientsSockets);
    }

  });

  client.on('end', (info) => {
    console.log('end', info);
  });
});

server.listen(3000,'localhost', info => console.log( 'Server started on port 3000 \n'));

