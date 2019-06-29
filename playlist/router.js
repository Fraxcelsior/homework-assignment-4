const { Router } = require('express')
const Team = require('./model')

const router = new Router()

router.get('/team', function (req, res, next) {
    Team
        .findAll()
        .then(teams => {
            res.status(200).json({ teams })
        })
        .catch(error => next(error))
})

router.get('/team/:id', function (req, res, next) {
    const id = req.params.id
    Team
        .findByPk(id)
        .then(team => res.status(200).json(team))
        .catch(error => next(error))
})

router.post('/team', function (req, res, next) {
    Team
        .create(req.body)
        .then(team => { res.status(201).json(team) })
        .catch(error => next(error))
})

router.put('/team/:id', function (req, res, next) {
    const id = req.params.id
    Team
        .findByPk(id)
        .then(team => {
            team.update(req.body)
        })
        .then(team => res.status(201).json(team))
        .catch(error => next(error))
})


module.exports = router