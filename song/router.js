const { Router } = require('express')
const auth = require('../auth/middleware')
const Song = require('./model')
const { toData } = require('../auth/wt')
const Playlist = require('../playlist/model')

const router = new Router()

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

module.exports = router