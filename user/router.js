const { Router } = require('express')
const auth = require('../auth/middleware')
const bcrypt = require('bcrypt')
const User = require('./model')

const router = new Router()

router.get('/users/', function (req, res, next) {
    User
        .findAll()
        .then(users => {
            res.status(201).json({ users })
        })
        .catch(error => next(error))
})

router.get('/users/:id', auth, function (req, res, next) {
    const id = req.params.id
    User
        .findByPk(id)
        .then(user => res.status(200).json(user))
        .catch(error => next(error))
})


router.post('/users/', function (req, res, next) {
    if (req.body.password != req.body.password_confirmation) {
        return res.status(422).send({message: 'Passwords do not match' })
    }
    const user = {
        email: req.body.email,
        //password: bcrypt.hashSync(req.body.password, 10)
        password: req.body.password,
        password_confirmation: req.body.password_confirmation
    } 
    User
        .create(user)
        .then(user => { res.status(201).send(user) })
        .catch(error => next(error))
})


module.exports = router