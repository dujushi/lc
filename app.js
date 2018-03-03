const express = require('express')
const app = express()
const fs = require('fs');

const certFolder = '/etc/letsencrypt/live/lvtusoftware.com/';
const key = fs.readFileSync(certFolder + 'privkey.pem');
const cert = fs.readFileSync(certFolder + 'cert.pem');
const ca = fs.readFileSync(certFolder + 'chain.pem');

const options = {
  key: key,
  cert: cert,
  ca: ca
};

app.get('/', (req, res) => res.send('Hello World!'))

const https = require('https');
https.createServer(options, app).listen(443);

const http = require("http");
http.createServer(function(request, response){
    response.writeHead(302,  {Location: "https://lvtusoftware.com"})
    response.end();
}).listen(80);
