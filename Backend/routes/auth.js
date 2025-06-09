const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello from the auth route')
})

module.exports = router