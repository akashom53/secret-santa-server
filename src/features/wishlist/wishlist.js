const express = require('express')
const DBHelper = require('../../db/dbHelper')

const wishlistRoutes = express.Router()

wishlistRoutes.get('/', async (req, res) => {
  const userId = req.query.userId
  const items = await DBHelper.getWislistByUserId(userId)
  res.json({ wishlist: items ? items.reverse() : [], msg: 'Sucess' })
})

wishlistRoutes.post('/', async (req, res) => {
  const { name, desc, url, userId } = req.body
  await DBHelper.addWishlist(name, desc, url, userId)
  res.json({ msg: 'Success' })
})

module.exports = wishlistRoutes