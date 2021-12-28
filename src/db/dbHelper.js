const { createDb } = require('./database')
const prefillDb = require('./prefill')
const queries = require('./queries')
const fs = require('fs')

let db

const _run = async (query) => new Promise((resolve, reject) => {
  db.run(query, (error) => {
    if (error) {
      reject(error)
    } else {
      resolve()
    }
  })
})

const reset = async () => {
  fs.unlink('db.sqlite', async () => {
    await initDB()
  })
}

const initDB = async () => {
  const shouldPrefill = !fs.existsSync('db.sqlite')
  db = await createDb()
  await _run(queries.createUserTable)
  await _run(queries.createWishlistTable)
  if (shouldPrefill) {
    console.log('Prefilling data')
    prefillDb(db)
  }
  console.log('DB init complete')
}

const getUserByToken = async (token) => new Promise((resolve, reject) => {
  db.get(queries.getUserByToken, [token], (err, result) => {
    if (err) {
      reject(err)
    } else {
      resolve(result)
    }
  })
})


const getUserByPhone = async (phone) => new Promise((resolve, reject) => {
  db.get(queries.getUserByPhone, [phone], (err, result) => {
    if (err) {
      reject(err)
    } else {
      resolve(result)
    }
  })
})


const getAllUsers = async () => new Promise((resolve, reject) => {
  db.all(queries.getAllUsers, (err, result) => {
    if (err) {
      reject(err)
    } else {
      resolve(result)
    }
  })
})

const getUserById = async (id) => new Promise((resolve, reject) => {
  db.get(queries.getUserById, [id], (err, result) => {
    if (err) {
      reject(err)
    } else {
      resolve(result)
    }
  })
})

const setToken = async (id, token) => new Promise((resolve, reject) => {
  db.run(queries.setToken, [token, id], (err, result) => {
    if (err) {
      reject(err)
    } else {
      resolve(result)
    }
  })
})

const getWislistByUserId = async (userId) => new Promise((resolve, reject) => {
  db.all(queries.getWishlistByUserId, [userId], (err, result) => {
    if (err) {
      reject(err)
    } else {
      resolve(result)
    }
  })
})

const addWishlist = async (name, desc, url, userId) => new Promise((resolve, reject) => {
  db.run(queries.createWishlist, [name, desc, url, userId], (error) => {
    if (error) {
      reject(error)
    } else {
      resolve()
    }
  })
})

const logout = async (id) => new Promise((resolve, reject) => {
  db.run(queries.logoutUser, [id], (err) => {
    if (err) {
      reject(err)
    } else {
      resolve()
    }
  })
})

module.exports = DBHelper = { logout, getAllUsers, reset, initDB, getUserByPhone, getUserById, setToken, getWislistByUserId, addWishlist, getUserByToken, }