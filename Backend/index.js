const connectToMongo = require('./db');

connectToMongo();

const express = require('express')
const app = express()
const port = 5000
app.use(express.json()) //middleware to parse json
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
// app.use('/api/user', require('./routes/user'))


app.listen(port, () => {
  console.log(`inotebook backend listening on port ${port}`)
})
