const {Sequelize} = require('sequelize')
const PostModel = require('../api/resources/Posts/Post.model')
const log = require('../utils/logger')

const sequelize = new Sequelize('cWIo1M1r4k', 'cWIo1M1r4k', 'Y2jfoVS9Ub', {
    host: 'remotemysql.com',
    dialect: 'mysql'
})

const Post = PostModel(sequelize, Sequelize)

async function AuthenticateConnection(){
    try {
        await sequelize.authenticate()
        log.info('Connection has been established successfully.')
    } catch(error){
        log.error('Unable to connect to the database: ', error)
    }
}

AuthenticateConnection()

sequelize.sync({force:false})
    .then(() => {
        log.info('Synchronized tables')
    })

module.exports = {
    Post
}