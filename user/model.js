const Sequelize = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    field: 'email',
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    field: 'password',
    allowNull: false
  },
  password_confirmation: {
    type: Sequelize.STRING,
    field: 'password_confirmation',
  }
},
{ tableName: 'users' }
)

module.exports = User