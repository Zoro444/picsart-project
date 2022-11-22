import { connectToServer } from './connect-to-server.js'
import { command, changCurrentSocket } from './comands/commands.js';

const myData = {
    mySockets : [],
    online : {}
};

const serverConnection = connectToServer(3000);
myData.mySockets.push({ server : serverConnection})
let currentSocket = myData.mySockets[0].server;

process.stdin.on('data', (data) => {
  const input = data.toString().trim();

  if (input.startsWith('#')) {
   let commandName = input.replace("#", "");
   console.log(command(commandName, myData));

   return;  
  }

  if (input.startsWith('->')) {
    let clientName = input.replace("->", "").trim();
    let socket = changCurrentSocket(myData, clientName);
    if (typeof socket === 'string') {
      console.log(socket);
    }
    else {
      console.log(`chat whit ${clientName} is ready`);
      currentSocket = socket;
    }

   
    return;
  }

  if (input.startsWith('/')){
     currentSocket.write(input);
    return;
  }

    currentSocket.write(`${myData.myUserName} >>>> ${input}`);
});  

export { myData };
