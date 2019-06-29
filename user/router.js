const { Router } = require('express')
//const bcrypt = require('bcrypt')
const User = require('./model')

const router = new Router()

router.get('/user/', function (req, res, next) {
    User
        .findAll()
        .then(users => {
            res.status(201).json({ users })
        })
        .catch(error => next(error))
})

router.get('/user/:id', function (req, res, next) {
    const id = req.params.id
    User
        .findByPk(id)
        .then(user => res.status(200).json(user))
        .catch(error => next(error))
})


router.post('/user/', function (req, res, next) {
    const user = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    }
    User
        .create(user)
        .then(user => { res.status(201).send(user) })
        .catch(error => next(error))
})


module.exports = router