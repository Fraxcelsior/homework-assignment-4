const { Router } = require('express')
const auth = require('../auth/middleware')
const Song = require('./model')
const Playlist = require('../playlist/model')

const router = new Router()
/*
router.get('/player/', (req, res, next) => {
    const limit = req.query.limit || 25
    const offset = req.query.offset || 0

    Promise.all([
    Player
        .count(),
    Player
        .findAll({
            limit, offset
        })])
        .then(players => {
            res.status(200).json({ players })
        })
        .catch(error => next(error))
})

router.get('/player/:id', function (req, res, next) {
    const id = req.params.id
    Player
        .findByPk(id, { include: [Team] })
        .then(player => res.status(200).json(player))
        .catch(error => next(error))
})

router.post('/player/', function (req, res, next) {
    Player
        .create(req.body)
        .then(player => { res.status(201).json(player) })
        .catch(error => next(error))
})

router.put('/player/:id', function (req, res, next) {
    const id = req.params.id
    Player
        .findByPk(id)
        .then(player => {
            player.update(req.body)
        })
        .then(player => res.status(201).json(player))
        .catch(error => next(error))
})
*/

module.exports = router