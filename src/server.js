const express = require('express')
const DBHelper = require('./db/dbHelper')
const path = require('path')
const fs = require('fs')
const loginRoutes = require('./features/login/login')
const bodyParser = require('body-parser')
const wishlistRoutes = require('./features/wishlist/wishlist')
var cors = require('cors')



const port = process.env.PORT || 8000
const app = express()
app.use(cors())

const runApp = async () => {
  await DBHelper.initDB()

  const dir = path.join(__dirname, 'public')

  const mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
  }

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.get('/img/*', (req, res) => {
    const file = path.join(dir, req.path.replace(/\/$/, '/index.html'))
    if (file.indexOf(dir + path.sep) !== 0) {
      return res.status(403).end('Forbidden')
    }
    const type = mime[path.extname(file).slice(1)] || 'text/plain'
    const s = fs.createReadStream(file)
    s.on('open', () => {
      res.set('Content-Type', type)
      s.pipe(res)
    })
    s.on('error', () => {
      res.set('Content-Type', 'text/plain')
      res.status(404).end('Not found')
    })
  })

  app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
  })

  app.get('/', (req, res, next) => {
    res.json({ msg: 'ok' })
  })

  app.get((req, res) => {
    res.status(404)
  })

  app.use((req, res, next) => {
    // console.log("Hello")
    next()
  })

  app.use('/api/login', loginRoutes)
  app.use('/api/wishlist', wishlistRoutes)
}

runApp()