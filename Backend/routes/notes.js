const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello from the note route')
})

module.exports = router