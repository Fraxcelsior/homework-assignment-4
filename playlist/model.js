const Sequelize = require('sequelize')
const db = require('../db')
const Song = require('../song/model')
const User = require('../user/model')

const Playlist = db.define(
    'playlist',
    {
      name: {
        type: Sequelize.STRING,
        field: 'playlist_name'
      }
    },
    { tableName: 'playlists' }
  )
  Playlist.belongsTo(User)


module.exports = Playlist