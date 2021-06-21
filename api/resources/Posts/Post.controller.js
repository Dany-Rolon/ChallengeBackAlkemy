const log = require('../../../utils/logger')
const { Post } = require('./../../../db/db')

async function createPost(post){
    let postWithDate = {
        ...post,
        creation_date: new Date()
    }
    let newPost = await Post.create({
        ...postWithDate
    })
    return newPost
}

async function getPost(id){
    id = parseInt(id)
    const post = await Post.findByPk(id)
    return post
}

async function postExist(id){
    let ok = false
    id = parseInt(id)
    const post = await Post.findByPk(id)
    if(post){
        ok = true
    }
    return ok
}

async function getPosts(){
    const result = await Post.findAll({order:[['creation_date', 'DESC']]})
    return result
}

async function editPost(ID, post){
    await Post.update(
        {...post},
        {where: {ID}}
    ).then(result => {
        return result
    }).catch(err => {
        log.error(`An error occurred while editing a post [${err}]`)
    })
}

async function deletePost(ID){
    Post.destroy({
        where:{
            ID
        }
    })
}

module.exports = {
    createPost,
    getPost,
    getPosts,
    editPost,
    deletePost,
    postExist
}