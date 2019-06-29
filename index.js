const express = require('express')
const db = require('./db')
const authenticationRouter = require('./auth/router')
const userRouter = require('./user/router')
const playlistRouter = require('./playlist/router')
const songRouter = require('./song/router')
const bodyParser = require('body-parser')


//App is the API server
const app = express()
const jsonParser = bodyParser.json()
app.use(jsonParser)
app.use(userRouter)
app.use(authenticationRouter)
app.use(playlistRouter)
app.use(songRouter)

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`API server is listening on port ${port}`))

