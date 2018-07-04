const request = require('request');

module.exports = () => {
  return new Promise((resolve, reject) => {
    request({
      method: 'POST',
      uri: `${process.env.URI}/logout`
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
