let port = 3500

let http = require('http'),
  httpProxy = require('http-proxy');

let proxy = httpProxy.createProxyServer();

let server = http.createServer(function (req, res) {
  subdomain = req.headers.host.split('.')[0]
  isRailsApp = subdomain.match(/(api|id)/i)

  let targetHost = isRailsApp ? `${subdomain}.local.autoenrolment.co.uk:3000` : 'localhost:4200'
  proxy.web(req, res, { target: 'http://' + targetHost });

})

console.log(`listening on port:${port}`)
server.listen(port);
