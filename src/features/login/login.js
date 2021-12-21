const express = require('express')
const DBHelper = require('../../db/dbHelper')
const crypto = require('crypto')

const loginRoutes = express.Router()

loginRoutes.post('/', async (req, res) => {
  const phone = req.body.phone
  const user = await DBHelper.getUserByPhone(phone)
  if (!user) {
    return res.status(404).json({ msg: 'User not found' })
  }
  const giftee = await DBHelper.getUserById(user.gifteeId)
  user.gifteeId = null
  const token = crypto.randomBytes(64).toString('hex')
  await DBHelper.setToken(user.id, token)
  return res.json({ token, user, giftee })
})

module.exports = loginRoutes