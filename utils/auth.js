const request = require('request');

module.exports = (req) => {
  return new Promise((resolve, reject) => {
    request({
      method: 'POST',
      uri: `${process.env.URI}/api/s/${process.env.SITENAME}/cmd/stamgr`,
      json: true,
      jar: true,
      body: {
        cmd: 'authorize-guest',
        mac: req.session.macAddr,
        minutes: 60
      }
    }, (err, response, body) => {
      if (err) {
        reject(err)
      } else {
        resolve({
          response: response,
          body: body
        })
      }
    })
  })
}
