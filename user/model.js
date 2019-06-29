const Sequelize = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password_confirmation: {
    type: Sequelize.STRING,
  }
},
{ tableName: 'users' }
)

module.exports = User