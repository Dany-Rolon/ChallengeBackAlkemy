const express = require('express')
const log = require('../../../utils/logger')
const errorHandler = require('./../../libs/errorHandler').handleErrors

const Router = express.Router()
const Controller = require('./Post.controller')
const { validatePost } = require('./Post.validation')

Router.get('/', errorHandler(async(req, res) => {
    let result = await Controller.getPosts()
    if(result){
        log.info(`Sending all the posts`)
        res.status(200).send(result)
    } else {
        log.warn("There wasn't post to send")
        res.status(204)
    }
}))

Router.get('/:id', errorHandler(async(req, res) => {
    let id = req.params.id
    let result = await Controller.getPost(id)
    if(result){
        log.info(`Sending the post with id [${id}]`)
        res.status(200).send(result)
    } else {
        log.warn(`There wasn´t a post with id ${id}`)
        res.status(204)
    }
}))

Router.post('/', validatePost, errorHandler(async(req, res) => {
    let newPost = req.body
    let response = await Controller.createPost(newPost)
    log.info(`Post [${response.title}] was created`)
    res.status(200).json({
        message: 'Post created',
        newPost: response
    })
}))

Router.patch('/:id', errorHandler(async(req, res) => {
    let id = req.params.id
    let editedPost = req.body
    if(Controller.postExist(id)){
        await Controller.editPost(id, editedPost)
        log.info(`The post [${id}] was edited`)
        res.status(200).send('The post was edited')
    } else {
        log.warn(`The user tryed update an unexisting post`)
        res.status(500)
    }
}))

Router.delete('/:id', errorHandler(async(req, res) => {
    let id = req.params.id
    if(Controller.postExist(id)){
        await Controller.deletePost(id)
        log.info(`The post [${id}] was deleted`)
        res.status(200).send(`Post deleted`)
    } else {
        log.warn(`The user tryed delete an unexisting post`)
        res.status(500)
    }
}))

module.exports = Router