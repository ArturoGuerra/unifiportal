const request = require('request');

module.exports = () => {
  return new Promise((resolve, reject) => {
    request({
      method: 'POST',
      uri: `${process.env.URI}/api/login`,
      json: true,
      jar: true,
      body: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD
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
