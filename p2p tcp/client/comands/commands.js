import { startClient } from "../start-client.js";
import { connectToServer } from '../connect-to-server.js'

const COMMANDS = {
  ALL : '#',
  CONNECT: 'connect',
  LISTEN: 'listen',
  CLOSE : 'CLOSE'
};

function command(input, myData, currentSocket) {
 if (input === COMMANDS.LISTEN){
   if (myData.myPort === undefined) {
     return 'Your port is undefined please get from server your local port';      
   }
     startClient(myData.myPort);
 }
 else if (input.startsWith(COMMANDS.CONNECT)) {
     let commandName = input.replace('connect', "").trim();
     if (myData.online[commandName] === undefined) {
        console.log('No such client');
        return;
    } 
    connectToServer(myData.online[commandName], commandName);
 }

   else  'no such command'
}

function changCurrentSocket(myData, clientName){
   let flag = true;
   let socket =  myData.mySockets.reduce((aggr,v,i) => {
      let keys = Object.keys(myData.mySockets[i])
      if (keys[0] === clientName){
        flag = false;
        return aggr = myData.mySockets[i][clientName];
      }return aggr;
   },{});
   if (flag) {
     return 'no such client'
   } return socket;

   }

export  { COMMANDS, command, changCurrentSocket };
