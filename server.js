const express = require('express')
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()
app.use(cors());
const kucoinProxy = createProxyMiddleware({
  target: 'https://api.kucoin.com',
  changeOrigin: true,
  secure: false,
  pathRewrite: { '^/kucoin': '' },
});

app.use('/kucoin/*', kucoinProxy);

const ompProxy = createProxyMiddleware({
  target: 'https://api.ompfinex.com',
  changeOrigin: true,
  secure: false,
  pathRewrite: { '^/omp': '' },
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.chunkedEncoding = true;
    proxyReq.sendDate = true;
  }
});

app.use('/omp/*', ompProxy);

const streamProxy = createProxyMiddleware({
  target: 'http://localhost:3000',
  pathFilter: '/stream',
  ws: true,
});


const port = 3000;
app.listen(port, () => {
  console.info(`Proxy server is running on port ${port}`)
})
