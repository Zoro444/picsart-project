import net from 'net'
import { myData } from './client.js';

  function startClient(port) {  
    const server = net.createServer((socket) => {
    
    socket.on('data', (data) => {
      let input = data.toString().trim();
      if(socket.name === undefined) { 
        socket.name = input;
        myData.mySockets.push({[input] : socket})
        return;
      }
      if (!input.startsWith('~~')){
        socket.write(`~~${myData.myUserName} received~~`)
      }

      console.log(input);
    });
  
    socket.on('connect', (data) => {
      console.log(data.toString());
    });

    socket.on('error', (err) => {
     
    });

    socket.on('close', (info) => {
      console.log('one client left chat online clients is');
      myData.mySockets[0].server.write('/get/clients');
    });

  });

  server.listen(port);
};

 export { startClient };