const Joi = require("joi");
const log = require('../../../utils/logger')

const bluePrintPost = Joi.object({
    title: Joi.string().max(50).required(),
    content: Joi.string().required(),
    imageURL: Joi.string().required(),
    category: Joi.string().required()
})

const validatePost = (req, res, next) => {
    const result = bluePrintPost.validate(req.body, {abortEarly: false, convert: false})
    if(!result.error){
        log.info(`Post [${req.body.title}] passed the validation`)
        next()
    } else {
        log.error(`Post [${req.body.title}] not passed the validation. Errors [${result.error.details}]`)
        console.log(result.error.details)
        res.status(400).send('Invalid informartion for a post')
    }
}

module.exports = {
    validatePost
}