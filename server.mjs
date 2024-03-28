import express from "express";
import {WebSocketServer} from "ws";
import {Centrifuge} from "centrifuge";
import {WebSocket} from "ws";

const app = express();
const port = 3000;

app.get('/omp/markets', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const response = await fetch('https://api.ompfinex.com/v1/market', {
      method: 'GET'
    })
    console.log('data successfully connected');
    const data = await response.json();
    res.send(data);
  } catch (err) {
    console.log('error happened', err);
  }
})

app.get('/kucoin/token', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const response = await fetch('https://api.kucoin.com/api/v1/bullet-public', {
      method: 'POST',
      body: null
    })
    console.log('data successfully connected');
    const data = await response.json();
    res.send(data);
  } catch (err) {
    console.log('error happened', err);
  }
})

const server = app.listen(port, () => {
  console.log(`Server running on localhost port: ${port}`);
});

const client = new Centrifuge('wss://stream.ompfinex.com/stream', {websocket: WebSocket});
let ompStreamData = {};

client.on('connecting', (ctx) => {
  console.log('connecting to ompfinex websocket...');
})
client.on('connected', (ctx) => {
  console.log('successfully connected to ompfinex websocket');
})
client.connect();
const sub = client.newSubscription('public-market:r-price-ag');
sub.on('subscribing', (ctx) => {
  console.log('subscribing to market channel...');
})
sub.on('subscribed', (ctx) => {
  console.log('successfully subscribed');
})
sub.on('error', (err) => {
  console.log('on subscribing error happened', err);
})
sub.on('publication', (ctx) => {
  ompStreamData = JSON.stringify(ctx.data);
})
sub.subscribe();

const ompWebSocketServer = new WebSocketServer({
  server: server,
});

ompWebSocketServer.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });
  setInterval(() => {
    ws.send(ompStreamData);
  }, 2000);
})
