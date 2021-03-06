'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');
const BFX = require('bitfinex-api-node');

const bfx = new BFX({ 
    apiKey: '1234',
    apiSecret: '4321',
})

const bfxRest = bfx.rest(2);

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

var Crypto = {date:"Waiting...", open:"Waiting...", close:"Waiting...", high:"Waiting...", low:"Waiting...", volume:"Waiting..."};
/*
setInterval(() => {
    wss.clients.forEach((client) => {
	var opts = {timeframe:"1m", symbol:"tIOTUSD", section:"last"};
        bfxRest.candles(opts, (err, res) => {
	    if (err) {
	        console.log(err)
	    }
	    Crypto = {date: res[0], open: res[1], close: res[2], high: res[3], low: res[4], volume: res[5]};
    })
      client.send(JSON.stringify(Crypto));
    });
}, 4000);
*/
