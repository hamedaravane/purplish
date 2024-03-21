export default [
  {
    context: ['/v1','/v2','/v3','/v4'],
    target: 'https://api.ompfinex.com',
    secure: false,
    changeOrigin: true,
    logLevel: 'info',
  },
  {
    context: ['/api'],
    target: 'https://api.kucoin.com',
    secure: false,
    changeOrigin: true,
    logLevel: 'info',
  }
]
