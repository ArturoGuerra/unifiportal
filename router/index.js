const { Router } = require('express');
const path = require('path');

const router = new Router();

router.get('/', (req, res) => {
  let query = req.query
  req.session.macAddr = query.id;
  req.session.accessPoint = query.ap;
  req.session.time = query.t;
  req.session.url = query.url;
  req.session.ssid = query.ssid;

  console.log(req.session.macAddr)
  res.sendFile(path.join(__dirname, '../views', 'index.html'))
})

module.exports = router
