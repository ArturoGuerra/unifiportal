#!/usr/bin/env node
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const http = require('http');
const path = require('path');

const app = new express();
const httpServer = http.createServer(app)

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000
const socket = process.env.SOCKET || null
const dev = !(process.env.NODE_ENV === 'production')

app.set('port', port)
app.set('host', host)
app.set('socket', socket)

if (dev) {
  app.set('trust proxy', true)
}

app.use(morgan('short'))
app.use(cookieParser())

app.use('/static', express.static(path.join(__dirname, 'static')))
app.use(require('express-session')({
  secret: 'reeee',
  resave: true,
  saveUninitialized: true
}));
app.use('/guest/s/:id', require('./router'))
app.use('/authorize', require('./router/authorize'))

// Listen the server
function StartServer () {
  if (socket) {
    if (fs.existsSync(socket)) {
      fs.unlinkSync(socket)
    }
    httpServer.listen(socket, () => { console.log('Server listening on ' + socket) })
    fs.chmodSync(socket, '0777')
  } else {
    httpServer.listen(port, host, () => {
      console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
    })
  }
}

StartServer()
