const { Router } = require('express')
const auth = require('../auth/middleware')
const Song = require('./model')
const { toData } = require('../auth/wt')
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
*/
router.get('/songs', (req, res, next) => {
    Song
        .findAll()
        .then(songs => {
            res.status(200).json({ songs })
        })
        .catch(error => next(error))
})

router.post('/songs', auth, (req, res, next) => {
    const splitUrl = req.baseUrl.split("")
    const listId = splitUrl.slice(-1)[0]
    
    Song
        .create( {
            title: req.body.title,
            artist: req.body.artist,
            album: req.body.album,
            playlistId: listId
        } )
        .then(song => { res.status(201).json(song) })
        .catch(error => next(error))
})

/*
router.post('/song/', auth, (req, res, next) => {
    const head = req.headers.authorization && req.headers.authorization.split(' ')
    const data = toData(head[1])
    Song
        .create( {
            name: req.body.name,
            userId: data.userId
        })
        .then(playlist => { res.status(201).json(playlist) })
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