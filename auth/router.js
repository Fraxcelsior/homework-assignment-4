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
        //1. find user based on email, 'entity' is callback from promise
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
                //2. use bcrypt.compareSync to check pw against stored hash
                if (bcrypt.compareSync(req.body.password, entity.password)) {
                    //3. if pw is correct, return JWT with userId of user (user.id)
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
        //to implement steps 1-3, we used Sequelize and promise chaining^
    }
})

router.get('/secret-endpoint', auth, (req, res) => {
    res.send({
        message: `Thanks for visiting the secret endpoint, ${req.user.email}.`,
    })
})


module.exports = router