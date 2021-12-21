var sqlite3 = require('sqlite3').verbose()
const DBSOURCE = "db.sqlite"

const createDb = async () => new Promise((resolve, reject) => {

  let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.log(err.message)
      reject(err)
    }
    console.log("DB connected")
    resolve(db)
  })
})

module.exports = { createDb }