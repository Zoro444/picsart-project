function help(socket) {
  socket.write( 'Server >>>> server information! \n') ;
  socket.write( 'Server >>>> /clients -->  return all online clients \n') ;
}

function returnClients(client, namesOfOnlineClients, onlineClientsSocket) {
   if (namesOfOnlineClients.length === 1) {
     client.write(`Server >>>> No clients online\n`);
     return;
   }
   let onlineClients = namesOfOnlineClients.reduce((agr, v) => {
     for (let i = 0; i < onlineClientsSocket.length; i++) {
        if (v === client.userName) {
            return agr;}
        else if (v === onlineClientsSocket[i].userName) {
            agr.push({clientName : v, clientPort : onlineClientsSocket[i].clientPort })
   
            return agr;
        }
     }
   },[]);

   client.write(JSON.stringify({onlineClients}))
    return 1;
}

function isValidUserName(userName, client, onlineClients) {
   let isValid = userName.match(/[A-Z][a-z]+\d+/g);

   if ( isValid === null ) { 
    return `Server >>>> Username should start with uppercase have at least 1 or more digits\n`
   }
   if (isValid[0].length > 8 || isValid[0].length < 4) {
    return `Server >>>> Username length must be at least 4 characters and less then 9 characters\n`
   }
   isValid = isValid.toString();
   let isNameExists = onlineClients.reduce((aggr,v) => {
    console.log(v === isValid);
     if (isValid === v) {
       return aggr = true
     }
     return aggr;
   }, false);
    
   if (isNameExists) {
    return `${isValid} username is already taken, please input new one`
   }
   
   onlineClients.push(isValid);
   client.userName = isValid;
   
   return `Welcome ${isValid}\n`
}

function getPort(client, port, clientName) {
    client.write(JSON.stringify({myPort : port, myUsername : clientName }));
}
export { help, returnClients, getPort, isValidUserName };
