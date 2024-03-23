const express = require('express')
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()
app.use(cors({credentials: true}))
const customUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36';
const kucoinProxy = createProxyMiddleware({
  target: 'https://api.kucoin.com',
  changeOrigin: true,
  secure: false,
  pathRewrite: { '^/kucoin': '' },
});

app.use('/kucoin/*', kucoinProxy);

const ompProxy = createProxyMiddleware({
  target: {
    host: 'api.ompfinex.com',
    protocol: 'https:',
    port: 443
  },
  changeOrigin: true,
  secure: false,
  pathRewrite: { '^/omp': '' },
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.chunkedEncoding = true;
    proxyReq.sendDate = true;
  }
});

app.use('/omp/*', ompProxy);

const port = 3000;
app.listen(port, () => {
  console.info(`Proxy server is running on port ${port}`)
})
