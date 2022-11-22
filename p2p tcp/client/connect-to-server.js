
import net from 'net'
import { myData } from './client.js';
import { command } from './comands/commands.js'

function connectToServer(port, name) {
  const serverConnection = net.connect(port, 'localhost');

  if (name !== undefined){
     myData.mySockets.push({[name] : serverConnection });
  }

  if (myData.myUserName !== undefined) {
      serverConnection.on('connect', (connect) => {
      serverConnection.write(myData.myUserName);
      });
  }

  serverConnection.on('data', (data) => {
    try { 
      let input = JSON.parse(data);

      if (input.onlineClients !== undefined) {
        myData.online = [];
        
        for (let i = 0; i < input.onlineClients.length; i++) {
          myData.online[input.onlineClients[i].clientName] = input.onlineClients[i].clientPort;
          console.log(`Now is online -> ${input.onlineClients[i].clientName}\n`);
          command(`connect ${input.onlineClients[i].clientName}`, myData);
        }
          
        console.log(`to send message to server write ->server`);
        console.log(`to send message to client write ->clientName`);
        return;
      }

      if (input.myPort !== undefined && myData.myPort === undefined) {
        myData.myPort = input.myPort;
        myData.myUserName = input.myUsername;
        command('listen', myData);
        return;
      }

      console.log(input);

    } catch (err) {
      let input = data.toString().trim();
      if (!input.startsWith('~~') && myData.myUserName !== undefined){
        serverConnection.write(`~~${myData.myUserName} received~~`);
      }
      console.log(input);
    }
  });

  serverConnection.on('error', (err) => {
    
  });

  serverConnection.on('close', (info) => {
    console.log('one of the clients left the chat\nonline clients are\n');
    myData.mySockets[0].server.write('/clients')
  });

  return serverConnection;
}

export { connectToServer }
