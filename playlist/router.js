const { Router } = require('express')
const auth = require('../auth/middleware')
const { toData } = require('../auth/wt')
const Playlist = require('./model')
const User = require

const router = new Router()

router.get('/playlists/', auth, (req, res, next) => {
    const head = req.headers.authorization && req.headers.authorization.split(' ')
    const data = toData(head[1])
    Playlist
        .findAll( {
            where: {
                userId:data.userId
            }
        })
        .then(playlists => {
            res.status(200).json({ playlists })
        })
        .catch(error => next(error))
})

router.get('/playlists/:id', auth, (req, res, next) => {
    const head = req.headers.authorization && req.headers.authorization.split(' ')
    const data = toData(head[1])
    const id = req.params.id
    Playlist
        .findByPk(id)
        .then(playlist => {
            if(playlist.userId !== data.userId) {
                return res.status(404).json({message: 'Forbidden'})
            } else {
            res.status(200).json(playlist)}
        })
        .catch(error => next(error))
})

router.post('/playlists/', auth, (req, res, next) => {
    const head = req.headers.authorization && req.headers.authorization.split(' ')
    const data = toData(head[1])
    Playlist
        .create( {
            name: req.body.name,
            userId: data.userId
        })
        .then(playlist => { res.status(201).json(playlist) })
        .catch(error => next(error))
   // }
    
})
/*
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
*/

module.exports = router