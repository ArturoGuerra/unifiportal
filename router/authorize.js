const { Router } = require('express');
const { login, logout, auth } = require('../utils');
const request = require('request');
const router = new Router()

router.post('/', async (req, res) => {
  console.log(req.session.macAddr)
  try {
    let loginres = await login()
    console.log('Logged into unifi')
    try {
      let authres = await auth(req)
      console.log(`Authorized: ${req.session.macAddr}`)
      res.redirect(process.env.REDIRECT)
    } catch (e) {
      console.error(e)
    }
    let logoutres = await logout()
    console.log('Logged out of unifi')
  } catch (e) {
    console.error(e)
  }
})

module.exports = router
