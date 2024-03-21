const proxyConfig = [
  {
    context: ['/v1/*', '/v2/*', '/v3/*', '/v4/*'],
    target: {
      host: "api.ompfinex.com",
      protocol: "https:",
      port: 443
    },
    secure: false,
    changeOrigin: true,
    logLevel: 'error'
  }
]
export default proxyConfig;
