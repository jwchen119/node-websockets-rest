'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');
const cryptoSocket = require("crypto-socket")


const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });


wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

var CRYPTO;
setInterval(
    function(){
    CRYPTO = cryptoSocket.start("bitfinex",['LTCBTC','BTCUSD']);
    },1000);

setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(CRYPTO);
  });
}, 1000);
