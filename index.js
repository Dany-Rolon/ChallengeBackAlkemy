const express = require('express')
const app = express()
const log = require('./utils/logger')
const PostRouter = require('./api/resources/Posts/Post.routes')

require('./db/db')

app.use(express.json())

app.use('/post', PostRouter)

app.listen(4000, () => {
    log.info('Server Listening on port 4000');
})