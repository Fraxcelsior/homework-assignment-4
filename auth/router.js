const { Router } = require('express')
const bcrypt = require('bcrypt')
const { toJWT } = require('./wt')
const User = require('../user/model')
const auth = require('./middleware')
const router = new Router()

router.post('/tokens', function (req, res, next) {
    const emails = req.body.email
    const password = req.body.password

    if (!emails || !password) {
        res.status(400).send({
            message: 'Please supply a valid email and password'
        })
    }
    else {
        User
            .findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(entity => {
                if (!entity) {
                    res.status(400).send({
                        message: 'E-mail or password was incorrect'
                    })
                }
                if (bcrypt.compareSync(req.body.password, entity.password)) {
                    res.send({
                        jwt: toJWT({ userId: entity.id })
                    })
                }
                else {
                    res.status(400).send({
                        message: 'E-mail or password was incorrect'
                    })
                }
            })
            .catch(error => {
                console.error(error)
                res.status(500).send({
                    message: 'Oops! Something went wrong'
                })
            })
    }
})


module.exports = router